import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tasks } from '../models/tasks.js';
import { Courses } from '../models/courses.js';

import './users/accounts-config.js';

import './main.html';
import './template/hello.html';
import './template/task.html';
import './template/listTask.html';
import './template/courses.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.listTask.helpers({
  tasks() {
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
})

Template.listTask.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);
 
    // Clear form
    target.text.value = '';
  },

  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },

  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
});

Template.courses.helpers({
  courses() {
    return Courses.find({}, { sort: { createdAt: -1 } });
  },
})

Template.courses.events({
  'submit .new-courses'(event) {

    event.preventDefault();

    const target = event.target;
    var course_name = target.course_name.value;
    var course_code = target.course_code.value;

    Meteor.call('courses.insert', course_name, course_code);

    target.course_name = '';
    target.course_code = '';
  },

  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('courses.setChecked', this._id, !this.checked);
  },

  'click .delete'() {
    Meteor.call('courses.remove', this._id);
  },
});