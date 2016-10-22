'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
studentinstudio = require('../../app/controllers/StudentInStudioController');

module.exports = function(app) {
// Article Routes
app.route('/studentinstudio')
    .get(studentinstudio.all)
    .post(users.requiresLogin, studentinstudio.create)
    .put(users.requiresLogin, studentinstudio.update);
app.route('/studentinstudio/:studentinstudioId')
    .delete(users.requiresLogin, studentinstudio.destroy)
    .get(studentinstudio.show);
    // .put(users.requiresLogin, studentinstudio.update);
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)


// Note: the studentinstudios.studentinstudio function will be called everytime then it will call the next function.
app.param('studentinstudioId', studentinstudio.studentinstudio);
};