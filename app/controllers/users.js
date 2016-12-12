'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize');

/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    console.log('Logout: { id: ' + req.user.id + ', username: ' + req.user.username + '}');
    req.logout();
    return res.send({status : 'success', message : 'User logout successfully.'});
};

/**
 * Session
 */
exports.session = function(req, res) {
    return res.send({status : 'success', message : 'User login successfully.'})
   // res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var message = null;
    db.Tz.find({where : { id: req.body.id }}).then(function(user){
        if (!user) {
            // return next(new Error('No such user in db ' + req.body.id));
            return res.send({status : 'faild', message : 'No such user in db.'})
        }
        else{
            var user = db.User.build(req.body);

            user.provider = 'local';
            user.salt = user.makeSalt();
            user.hashedPassword = user.encryptPassword(req.body.password, user.salt);
            console.log('New User (local) : { id: ' + user.id + ' username: ' + user.username + ' }');
            
            user.save().then(function(){
            req.login(user, function(err){
                if(err) {
                    return next(err);
                }
                return res.send({status : 'success', message : 'User signup successfully.'})
            // res.redirect('/');
            });
            }).catch(function(err){
            res.render('users/signup',{
                message: message,
                user: user
            });
            });
        }
        }).catch(function(err){
            next(err);
    });


};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    db.User.find({where : { id: id }}).then(function(user){
      if (!user) {
          return next(new Error('Failed to load User ' + id));
      }
      req.profile = user;
      next();
    }).catch(function(err){
      next(err);
    });
};

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        //return res.redirect('/views/401.html');
        
        return res.render('401', {
            error: 'אינך מחובר...',
            status: 401
        });
        
        //basic way of error handeling
        // return res.status(401).send('User is not authorized');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (!req.user.IsAdmin) {
        return res.render('401', {
            error: 'אין ברשותך הרשאות מתאימות לגישה לדף זה.',
            status: 401
        });
    //   basic way of error handeling
    //   return res.status(401).send('User is not authorized');
    }
    next();
};
