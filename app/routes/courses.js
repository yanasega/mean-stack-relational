'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
courses = require('../../app/controllers/CourseController');

module.exports = function(app) {
// Article Routes
app.route('/courses')
    .post(users.requiresLogin, courses.create);
//     .get(courses.all)
// app.route('/courses/:courseId')
//     .delete(users.requiresLogin, courses.destroy);
    // .get(articles.show)
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)
// Finish with setting up the articleId param
// Note: the registrations.registration function will be called everytime then it will call the next function.
app.param('courseId', courses.course);
};