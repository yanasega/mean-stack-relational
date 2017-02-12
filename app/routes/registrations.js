'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
registrations = require('../../app/controllers/RegistrationController');

module.exports = function(app) {
// Article Routes
app.route('/registrations')
    .get(registrations.all)
    .post(users.requiresLogin, registrations.create);
app.route('/registrations/:registrationId')
    .delete(users.requiresLogin, registrations.destroy)
    .get(registrations.show)
    .put(users.requiresLogin, registrations.update);
app.route('/getregistration')
    .get(users.requiresLogin, registrations.getmax);
app.route('/downloadprefs/:registrationId')
    .get(users.requiresLogin, registrations.downloadprefs);
app.route('/deletedownload/:path')
    .get(users.requiresLogin, registrations.deletefile);
// Note: the registrations.registration function will be called everytime then it will call the next function.
app.param('registrationId', registrations.registration);
app.param('path', registrations.path);
};