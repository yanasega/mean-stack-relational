'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
assignments = require('../../app/controllers/AssignmentController');

module.exports = function(app) {
// Article Routes
app.route('/assignments')
    .get(assignments.all)
    .post(users.requiresLogin, assignments.create);
app.route('/assignments/:assignmentId')
    .delete(users.requiresLogin, assignments.destroy)
    .get(assignments.show)
    .put(users.requiresLogin, assignments.update);
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)


// Note: the assignments.assignment function will be called everytime then it will call the next function.
app.param('assignmentId', assignments.assignment);
};