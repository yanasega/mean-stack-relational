'use strict';

/**
* Module dependencies.
*/
var password = require('../../app/controllers/PasswordController');

module.exports = function(app) {
// Password Routes
app.route('/password/forgot/')
    .post(password.forgot);
app.route('/password/reset')
    .post(password.reset);



};