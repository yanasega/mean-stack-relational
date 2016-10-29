'use strict';


var users = require('../../app/controllers/users');

module.exports = function(app) {
    //admin views and actions:
    app.route('/adminhome').get(users.requiresLogin, users.hasAuthorization);
    app.route('/openregistration').get(users.requiresLogin, users.hasAuthorization);
    app.route('/viewregistration').get(users.requiresLogin, users.hasAuthorization);
    app.route('/viewstudents').get(users.requiresLogin, users.hasAuthorization);
    app.route('/viewstudents/:studentId').get(users.requiresLogin, users.hasAuthorization);
    app.route('/uploadstudents').get(users.requiresLogin, users.hasAuthorization);
    app.route('/students/:studentId/edit').get(users.requiresLogin, users.hasAuthorization);
    app.route('/viewstudios').get(users.requiresLogin, users.hasAuthorization);
    app.route('/studios/:studioId/edit').get(users.requiresLogin, users.hasAuthorization);
    app.route('/ViewInstructors').get(users.requiresLogin, users.hasAuthorization);
    app.route('/ViewSubjects').get(users.requiresLogin, users.hasAuthorization);
    app.route('/viewcourses').get(users.requiresLogin, users.hasAuthorization);
    app.route('/CreateNewAssignment').get(users.requiresLogin, users.hasAuthorization);
    app.route('/ViewPreviousAssignment').get(users.requiresLogin, users.hasAuthorization);
    app.route('/assignments/:assignmentId/edit').get(users.requiresLogin, users.hasAuthorization);
    app.route('/assignments/:assignmentId/view').get(users.requiresLogin, users.hasAuthorization);

    //usre views
    app.route('/userhome').get(users.requiresLogin);
    app.route('/viewdetails').get(users.requiresLogin);
    app.route('/insertpreferences').get(users.requiresLogin);
    app.route('/viewstudentincourse').get(users.requiresLogin);
    app.route('/viewpreferences').get(users.requiresLogin);
    app.route('/viewstudentassignments').get(users.requiresLogin);

}