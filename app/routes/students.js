'use strict';

var users = require('../../app/controllers/users'),
students = require('../../app/controllers/StudentController');

module.exports = function(app) {

var multer  = require('multer')

var upload = multer({ 
    dest: 'uploads/',
    limits: {fileSize: 1000000, files:1},
 })

app.route('/upload').post(upload.any(), function (req, res, next) {
    res.send(req.files);
});

// Article Routes
app.route('/students')
    .get(students.all);
    // .post(users.requiresLogin, students.create);
// app.route('/students/:studentId')
//     .delete(users.requiresLogin, students.destroy);
    // .get(articles.show)
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)

// Note: the registrations.registration function will be called everytime then it will call the next function.
// app.param('studentId', students.student);

// app.route('/upload/:uploadId')
//     .get('/uploads/:uploadId');

};