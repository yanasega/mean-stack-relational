'use strict';

var users = require('../../app/controllers/users'),
createNewAssigment = require('../../app/controllers/CreateNewAssignmentController'),
updatestudentinstudio = require('../../app/controllers/StudentInStudioController');

module.exports = function(app) {

app.route('/createNewAssigment/:year/:semester')
    .get(users.requiresLogin, createNewAssigment.runAlgorithem);
//     .delete(users.requiresLogin, students.destroy);
    // .get(articles.show)
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)

app.route('/getstudentinstudio/:assignmentId')
    .get(users.requiresLogin, createNewAssigment.getByAssignmentId)
    .put(users.requiresLogin, updatestudentinstudio.update);

app.route('/getstudentinstudio/:assignmentId/:studentId')
    .get(users.requiresLogin, createNewAssigment.getByAssignmentIdandStudentId);

// Note: the registrations.registration function will be called everytime then it will call the next function.
app.param(['year','semester'], createNewAssigment.setParams);
app.param('assignmentId', createNewAssigment.setAssignmentId);
app.param('studentId', createNewAssigment.setStudentId);
};
