'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

/**
 * Find registration by id
 * Note: This is called every time that the parameter :articleId is used in a URL. 
 * Its purpose is to preload the article on the req object then call the next function. 
 */


exports.getmax = function(req, res, next) {
    db.Registration.max('id').then(
        function(reg){db.Registration.find({where: {id: reg}}).then(function(registration){
                if(!registration) {
                    return res.jsonp(null);
                } else {
                    return res.jsonp(registration);          
                }
            }).catch(function(err){
                return next(err);
            }) 
        }
    ).catch(function(err){
        return next(err);
    })  
};

exports.registration = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Registration.find({where: {id: id}}).then(function(registration){
        if(!registration) {
            return next(new Error('Failed to load registration ' + id));
        } else {
            req.registration = registration;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Create a registration
 */
exports.create = function(req, res) {
    // augment the article by adding the UserId
    //req.body.UserId = req.user.id;
    // save and return and instance of article on the res object. 
    db.Registration.create(req.body).then(function(registration){
        if(!registration){
            // return res.send('users/signup', {errors: new StandardError('Registration could not be created')}); //yana:change the landing page.
            return res.status(500).send({errors: new StandardError('Registration could not be created')});
        } else {
            return res.jsonp(registration);
        }
    }).catch(function(err){
        // return res.send('users/signup', { 
        //     errors: err,
        //     status: 500
        // });
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Update a registration
 */
exports.update = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var registration = req.registration;
    registration.updateAttributes({
        EndDate: req.body.EndDate,
        IsActive: req.body.IsActive
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        // return res.render('error', {
        //     error: err, 
        //     status: 500
        // });
       return res.status(500).send({status:500, message:'internal error: ' + err});       
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var registration = req.registration;

    registration.destroy().then(function(){
        return res.jsonp(registration);
    }).catch(function(err){
        // return res.render('error', {
        //     error: err,
        //     status: 500
        // });
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Show a registration
 */
exports.show = function(req, res) {
    // Sending down the registration that was just preloaded by the registrations.registration function
    // and saves registration on the req object.
    return res.jsonp(req.registration);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Registration.findAll().then(function(registration){
        return res.jsonp(registration);
    }).catch(function(err){
        // return res.render('error', {
        //     error: err,
        //     status: 500
        // });
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Article authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.article.User.id !== req.user.id) {
      return res.send(401, 'User is not authorized');
    }
    next();
};
