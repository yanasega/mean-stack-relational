'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
studentinmanagedcourse = require('../../app/controllers/StudentManagedCourseController');

module.exports = function(app) {
// Article Routes
app.route('/studentmanagedcourse')
    .get(studentinmanagedcourse.all)
    .post(users.requiresLogin, studentinmanagedcourse.create)
    .put(users.requiresLogin, studentinmanagedcourse.update);

app.route('/studentmanagedcourse/:studentmanagedcourseId')
    .delete(users.requiresLogin, studentinmanagedcourse.destroy)

app.route('/getstudentmanagedcourse/:userId')
    .get(studentinmanagedcourse.getmycourses);
// Note: the studentinstudios.studentinstudio function will be called everytime then it will call the next function.
app.param('studentmanagedcourseId', studentinmanagedcourse.studentincourse);
app.param('userId', studentinmanagedcourse.setUserId);


};