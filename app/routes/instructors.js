'use strict';

var users = require('../../app/controllers/users'),
instructors = require('../../app/controllers/InstructorController');

module.exports = function(app) {

// var multer  = require('multer')

// var upload = multer({
//     dest: 'uploads/',
//     limits: {fileSize: 1000000, files:1},
//  })

// app.route('/upload').post(upload.any(), function (req, res, next) {
//     res.send(req.files);
// });

// Article Routes
app.route('/instructors')
    .get(instructors.all)
    .post(users.requiresLogin, instructors.create);
    //.post(instructors.create);

};
