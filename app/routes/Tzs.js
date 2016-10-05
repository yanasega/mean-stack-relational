'use strict';

var users = require('../../app/controllers/users'),
tzs = require('../../app/controllers/TzController');

module.exports = function(app) {

// Article Routes
app.route('/tzs')
    .get(tzs.all)
    .post(users.requiresLogin, tzs.create);

app.route('/insertTz/:path')
    .get(users.requiresLogin, tzs.insertTz);

// Note: the registrations.registration function will be called everytime then it will call the next function.
app.param('path', tzs.path);


};
