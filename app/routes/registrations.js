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
    .delete(users.requiresLogin, registrations.destroy);

    // .get(articles.show)
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)

// Finish with setting up the articleId param

//     .get(articles.show)
//     .put(users.requiresLogin, articles.hasAuthorization, articles.update)
//     .delete(users.requiresLogin, articles.hasAuthorization, articles.destroy);



// Note: the registrations.registration function will be called everytime then it will call the next function.
app.param('registrationId', registrations.registration);
};