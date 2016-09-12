'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
studentincourses = require('../../app/controllers/StudentInCourseController');

module.exports = function(app) {
// Article Routes
app.route('/studentincourses')
    .get(studentincourses.all)
    .post(users.requiresLogin, studentincourses.create);
app.route('/studentincourses/:studentincourseId')
    .delete(users.requiresLogin, studentincourses.destroy)
    .get(studentincourses.all)
    .post(users.requiresLogin, studentincourses.create);
     // .get(articles.show)
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)
// Finish with setting up the articleId param
// Note: the registrations.registration function will be called everytime then it will call the next function.
app.param('studentincourseId', studentincourses.studentincourse);
};