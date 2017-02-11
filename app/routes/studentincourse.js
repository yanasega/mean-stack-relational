'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
studentincourse = require('../../app/controllers/StudentInCourseController');

module.exports = function(app) {
// Article Routes
app.route('/studentincourse')
    .get(studentincourse.all)
    .post(studentincourse.create)
    .put( studentincourse.update);
app.route('/getstudentincourse/:userId')
    .get(studentincourse.getmycourses);
app.route('/getstudentincourse/:courseId/:userId')
    .get(studentincourse.find)
    .put(studentincourse.update);
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)


// Note: the studentinstudios.studentinstudio function will be called everytime then it will call the next function.
app.param('studentincourseId', studentincourse.studentincourse);
app.param('courseId', studentincourse.setCourseId);
app.param('userId', studentincourse.setUserId);
};
