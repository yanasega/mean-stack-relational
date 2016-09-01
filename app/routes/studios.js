'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
studios = require('../../app/controllers/StudioController');

module.exports = function(app) {
var multer  = require('multer')
var crypto  = require('crypto')
var mime    = require('mime')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage});

app.route('/upload').post(upload.any(), function (req, res, next) {
    res.send(req.files);
});
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