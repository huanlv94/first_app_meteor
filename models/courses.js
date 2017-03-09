import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if ( Meteor.isServer ) {
  // var driver = new MongoInternals.RemoteCollectionDriver("mongodb://user:password@localhost:27017/db_name"); // Template
  var driver = new MongoInternals.RemoteCollectionDriver("mongodb://@localhost:27017/meteor");
}

export const Courses = new Mongo.Collection("courses", { _driver: driver });

Meteor.methods({
  'courses.insert'(name, code) {
    check(name, String);
    check(code, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
  
    Courses.insert({
      name: name,
      createdAt: new Date(),
      code: code
    });
  },
  'courses.remove'(courseId) {
    check(courseId, String);
 
    Courses.remove(courseId);
  },
  'courses.setChecked'(courseId, setChecked) {
    check(courseId, String);
    check(setChecked, Boolean);
 
    Courses.update(courseId, { $set: { checked: setChecked } });
  },
});