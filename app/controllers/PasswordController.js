'use strict';

/**
 * Module dependencies.
//  */
// var StandardError = require('standard-error');
// var db = require('../../config/sequelize');
var db = require('../../config/sequelize');

var nodemailer = require('nodemailer');

var async = require('async');
var crypto = require('crypto');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://archstuddatasystem@gmail.com:1!BillMike@smtp.gmail.com');


/**
 * Forgot password
 * send email 
 */

exports.forgot = function(req, res,next) {

    db.User.find({where : { Email: req.body.email }}).then(function(user){
        
      if (!user) {
         return res.status(500).send({errors: new StandardError('Email was not found in thesyste')});
      }
      crypto.randomBytes(20, function(err, buf) {
        
        //console.log(token);
        var token = buf.toString('hex');

        user.updateAttributes({
            
            resetPasswordToken : token,
            resetPasswordExpires : Date.now() + 3600000 // 1 hour
        }).then(function(a){
            var mailOptions = {
                from: '"archstuddatasystem 👥" <archstuddatasystem@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: 'Password Reset System - Please follow the attached link.', // Subject line
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/password/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n' // plaintext body
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
                return res.status(200).send({status:200, message:'Message sent.'});
                
            });
        }).catch(function(err){
            return res.status(500).send({status:500, message:'internal error: ' + err});
        });

      });
      
    }).catch(function(err){        
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};


exports.redirect = function(req, res) {
    console.log("redirect");
    db.User.find({ resetPasswordToken: req.params.token }).then(function(user){
        if (!user) {
            return res.render('401', {
                error: 'לא נמצא משתמש.',
                status: 401
            });
        }
        return res.redirect('/changepassword/' + req.params.token);
        // res.render('reset', {
        //     user: req.user
        // });
    }).catch(function(err){  
        return res.render('401', {
                error: 'התרחשה שגיאה בשרת.',
                status: 401
            });      
    });
};
/**
 * Reset Password
 */
exports.reset = function(req, res) {
    console.log("reset");
    db.User.find({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }).then(function(user){
        if (!user) {
            return res.render('401', {
                error: 'עבר יותר מידי זמן מקבלת הדוא"ל, אנא שלח דוא"ל נוסף.',
                status: 401
            });
        }
        if(req.body.password == req.body.passwordtwo){
            var usersalt = user.makeSalt();
            user.updateAttributes({
                salt: usersalt,
                hashedPassword: user.encryptPassword(req.params.password, user.salt),
                resetPasswordToken : null,
                resetPasswordExpires : null 
            }).then(function(a){
                req.login(user, function(err){
                    if(err) {
                        return res.status(500).send({status:500, message:'internal error: ' + err});  
                    }
                    return res.redirect('/home');
                })
            }).catch(function(err){
                return res.status(500).send({status:500, message:'internal error: ' + err});
            });
        }
        else{
            res.status(500).send({status:500, message:'passwords do not match.'});  
        }

    }).catch(function(err){  
        return res.status(500).send({status:500, message:'internal error: ' + err});      
    });
};

