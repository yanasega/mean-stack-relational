'use strict';

var users = require('../../app/controllers/users'),
createNewAssigment = require('../../app/controllers/CreateNewAssignmentController');

module.exports = function(app) {

app.route('/createNewAssigment/:year/:semester')
    .get(users.requiresLogin, createNewAssigment.runAlgorithem);
//     .delete(users.requiresLogin, students.destroy);
    // .get(articles.show)
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)

// Note: the registrations.registration function will be called everytime then it will call the next function.
app.param(['year','semester'], createNewAssigment.setParams);

};
