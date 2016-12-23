'use strict';

/**
 * Module dependencies.
//  */
// var StandardError = require('standard-error');
// var db = require('../../config/sequelize');
var db = require('../../config/sequelize');

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
/**
 * Forgot password
 * send email 
 */

exports.forgot = function(req, res) {
    db.User.find({where : { Email: req.body.email }}).then(function(user){
      if (!user) {
         return res.status(500).send({errors: new StandardError('Email was not found in thesyste')});
      }
      
      
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};


/**
 * Reset Password
 */
exports.reset = function(req, res) {
    // Sending down the registration that was just preloaded by the registrations.registration function
    // and saves registration on the req object.
    return res.jsonp(req.params);
};

