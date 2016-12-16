'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
studentincourse = require('../../app/controllers/StudentManagedCourseController');

module.exports = function(app) {
// Article Routes
app.route('/studentmanagedcourse')
    .get(studentincourse.all)
    .post(users.requiresLogin, studentincourse.create)
    .put(users.requiresLogin, studentincourse.update);

app.route('/studentmanagedcourse/:studentmanagedcourseId')
    .delete(users.requiresLogin, studentincourse.destroy)


// Note: the studentinstudios.studentinstudio function will be called everytime then it will call the next function.
app.param('studentmanagedcourseId', studentincourse.studentincourse);

};