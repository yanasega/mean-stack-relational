'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
studentincourse = require('../../app/controllers/StudentManagedCourseController');

module.exports = function(app) {
// Article Routes
app.route('/studentincourse')
    .get(studentincourse.all)
    .post(users.requiresLogin, studentincourse.create)
    .put(users.requiresLogin, studentincourse.update);
// app.route('/studentincourse/:studentincourseId')
//     .delete(users.requiresLogin, studentincourse.destroy)
//     .get(studentincourse.show)
//     .put(users.requiresLogin, studentincourse.update);
app.route('/getstudentincourse/:courseId/:userId')
    .get(users.requiresLogin, studentincourse.find)
    .put(users.requiresLogin, studentincourse.update);
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)


// Note: the studentinstudios.studentinstudio function will be called everytime then it will call the next function.
app.param('studentincourseId', studentincourse.studentincourse);
app.param('courseId', studentincourse.setCourseId);
app.param('userId', studentincourse.setUserId);
};