'use strict';

var users = require('../../app/controllers/users'),
instructors = require('../../app/controllers/InstructorController');

module.exports = function(app) {


app.route('/instructors')
    .get(instructors.all)
    .post(users.requiresLogin, instructors.create);

app.route('/instructors/:instructorId')
    .get(instructors.show);

app.param('instructorId', instructors.instructor);


};
