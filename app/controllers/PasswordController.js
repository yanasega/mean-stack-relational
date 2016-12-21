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
var transporter = nodemailer.createTransport('smtps://yanasegal90@gmail.com:pass@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo 👥" <yanasegal90@gmail.com>', // sender address
    to: 'yanasegal90@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

/**
 * Forgot password
 * send email 
 */

exports.forgot = function(req, res,next) {
//   async.waterfall([
//     function(done) {

//     },
//     function(token, done) {
//       db.User.findOne({ Email: req.body.email }, function(err, user) {
//         if (!user) {
//             return res.status(500).send({errors: new StandardError('Email was not found in thesyste')});
//           //return res.redirect('/forgot');
//         }
//         console.log("user");

//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//         user.save(function(err) {
//           done(err, token, user);
//         });
//       });
//     },
//     function(token, user, done) {
//       var smtpTransport = nodemailer.createTransport('SMTP', {
//         service: 'SendGrid',
//         auth: {
//           user: '!!! YOUR SENDGRID USERNAME !!!',
//           pass: '!!! YOUR SENDGRID PASSWORD !!!'
//         }
//       });
//       var mailOptions = {
//         to: user.email,
//         from: 'passwordreset@demo.com',
//         subject: 'Node.js Password Reset',
//         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//           'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//           'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//       };
//       smtpTransport.sendMail(mailOptions, function(err) {
//         return res.status(20).send({errors: new StandardError('An e-mail has been sent to ' + user.email + ' with further instructions.')});
          
//         //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
//         //done(err, 'done');
//       });
//     }
//   ], function(err) {
//     if (err) return next(err);
//     res.redirect('/forgot');
//   });
    db.User.find({where : { Email: req.body.email }}).then(function(user){
        
      if (!user) {
         return res.status(500).send({errors: new StandardError('Email was not found in thesyste')});
      }
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        console.log(token);
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                console.log("here");
        user.save(function(err) {
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
        }).catch(function(err){        
            return res.status(500).send({status:500, message:'internal error: ' + err});
        });

      });
      
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

