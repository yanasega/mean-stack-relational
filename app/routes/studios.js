'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
studios = require('../../app/controllers/StudioController');

module.exports = function(app) {
// Article Routes
app.route('/studios')
    .get(studios.all)
    .post(users.requiresLogin, studios.create);
app.route('/studios/:studioId')
    .delete(users.requiresLogin, studios.destroy);
    // .get(articles.show)
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)
// Finish with setting up the articleId param
// Note: the registrations.registration function will be called everytime then it will call the next function.
app.param('studioId', studios.studio);
};