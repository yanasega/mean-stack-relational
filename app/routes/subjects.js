'use strict';

var users = require('../../app/controllers/users'),
subjects = require('../../app/controllers/SubjectController');

module.exports = function(app) {

// subjects Routes
app.route('/subjects')
    .get(subjects.all)
    .post(users.requiresLogin, subjects.create);

};
