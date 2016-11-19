'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
preferences = require('../../app/controllers/PreferenceController');

module.exports = function(app) {
// Article Routes
app.route('/preferences')
    .get(preferences.all)
    .post(users.requiresLogin, preferences.create);
app.route('/preferences/:preferenceId/:registrationId')
    .delete(users.requiresLogin, preferences.destroy)
    .get(preferences.show)
    .put(users.requiresLogin, preferences.update);
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)

    app.route('/getstudentpreference/:StudentId/:Studio')
    .get(users.requiresLogin, preferences.getPreferenceByStudentId);


// Note: the preferences.registration function will be called everytime then it will call the next function.
app.param('preferenceId', preferences.preference);
app.param('StudentId', preferences.setStudentId);
app.param('Studio', preferences.setStudioId);
};