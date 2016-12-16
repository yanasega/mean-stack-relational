'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');


/**
 * Create a Instructor
 */
exports.create = function(req, res) {
    // augment the article by adding the UserId
    //req.body.UserId = req.user.id;
    // save and return and instance of article on the res object. 
    db.Instructor.create(req.body).then(function(instructor){
        if(!instructor){
            return res.send('users/signup', {errors: new StandardError('Instructor could not be created')}); //yana:change the landing page.
        } else {
            return res.jsonp(instructor);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};


/**
 * Show a registration
 */
exports.show = function(req, res) {
    // Sending down the registration that was just preloaded by the registrations.registration function
    // and saves registration on the req object.
    return res.jsonp(req.instructor);
};

/**
 * List of Instructors
 */
exports.all = function(req, res) {
    db.Instructor.findAll().then(function(instructor){
        return res.jsonp(instructor);
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
        // return res.render('error', {
        //     error: err,
        //     status: 500
        // });
    });
};

