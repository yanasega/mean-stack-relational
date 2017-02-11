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
    .post(preferences.create);

app.route('/preferences/:StudentId/:registrationId/:Studio/:Rate').put(users.requiresLogin, preferences.update);

app.route('/preferences/:preferenceId/:registrationId')
    .delete(users.requiresLogin, preferences.destroy)
    .get(preferences.show)
    .put(preferences.update);
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)
app.route('/getstudentpreference/:StudentId/:Studio/:RegId')
    .get(preferences.getPreferenceByStudentAndStudioAndReg);

app.route('/getstudentpreferenceforedit/:StudentId/:Studio/:RegId')
        .get(preferences.getPreferenceByStudentAndStudioAndRegForEdit);
app.route('/getstudentpreference/:StudentId/:Studio/')
    .get(preferences.getPreferenceByStudentAndStudio);

app.route('/findstudentpreference/:StudentId/:RegId/')
    .get(preferences.getPreferenceByStudentAndReg);

app.route('/findstudentpreferencebyreg/:StudentId/:RegId/')
        .get(preferences.getPreferenceByStudentIdAndReg4);

 app.route('/getstudentpreference/:StudentId')
    .get(preferences.getPreferenceByStudentId)
    .put(preferences.update);

app.route('/getallstudentpreference/:StudentId')
    .get(preferences.getAllPreferenceByStudentId)

// Note: the preferences.registration function will be called everytime then it will call the next function.
app.param('preferenceId', preferences.preference);
app.param('StudentId', preferences.setStudentId);
app.param('registrationId',preferences.setRegId);
app.param('Studio', preferences.setStudioId);
app.param('RegId', preferences.setRegId);
app.param('Rate', preferences.setRate);

};
