import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if ( Meteor.isServer ) {
  // var driver = new MongoInternals.RemoteCollectionDriver("mongodb://user:password@localhost:27017/db_name"); // Template
  var driver = new MongoInternals.RemoteCollectionDriver("mongodb://@localhost:27017/meteor");
}

export const Tasks = new Mongo.Collection("tasks", { _driver: driver });

// export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
  
    var user_name = Meteor.users.findOne(this.userId).username.split("@")[0];
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: user_name,
      email: Meteor.users.findOne(this.userId).username
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
 
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
});