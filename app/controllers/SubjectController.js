'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');


/**
 * Create a SubjectMap
 */
exports.create = function(req, res) {
    // augment the article by adding the UserId
    //req.body.UserId = req.user.id;
    // save and return and instance of article on the res object.
    db.SubjectMap.create(req.body).then(function(subject){
        if(!subject){
            return res.status(500).send({status:500, message:'internal error: ' + err});
        } else {
            return res.jsonp(subject);
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
    return res.jsonp(req.subject);
};

/**
 * List of subjects
 */
exports.all = function(req, res) {
    db.SubjectMap.findAll().then(function(subject){
        return res.jsonp(subject);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};
