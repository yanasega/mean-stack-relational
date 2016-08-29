'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
gradeincourses = require('../../app/controllers/GradeInCourseController');

module.exports = function(app) {
// Article Routes
app.route('/gradeincourses')
    .get(gradeincourses.all)
    .post(users.requiresLogin, gradeincourses.create);
// app.route('/articles/:articleId')
//     .get(articles.show)
//     .put(users.requiresLogin, articles.hasAuthorization, articles.update)
//     .delete(users.requiresLogin, articles.hasAuthorization, articles.destroy);

// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
//app.param('articleId', articles.article);
};