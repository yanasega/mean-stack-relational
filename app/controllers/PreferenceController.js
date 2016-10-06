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
exports.preference = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Preference.find({where: {id: id}}).then(function(preference){
        if(!preference) {
            return next(new Error('Failed to load preference ' + id));
        } else {
            req.preference = preference;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Create a preference
 */
exports.create = function(req, res) {
    // augment the article by adding the UserId
    //req.body.UserId = req.user.id;
    // save and return and instance of article on the res object. 
    db.Preference.create(req.body).then(function(preference){
        if(!preference){
            return res.send('users/signup', {errors: new StandardError('Preference could not be created')}); //yana:change the landing page.
        } else {
            return res.jsonp(preference);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a registration
 */
exports.update = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var preference = req.preference;
    preference.updateAttributes({
        Rate: req.body.Rate
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.render('error', {
            error: err, 
            status: 500
        });
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var preference = req.preference;

    preference.destroy().then(function(){
        return res.jsonp(preference);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show a preference
 */
exports.show = function(req, res) {
    // Sending down the preference that was just preloaded by the preferences.preference function
    // and saves preference on the req object.
    return res.jsonp(req.preference);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Preference.findAll().then(function(preference){
        return res.jsonp(preference);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Article authorizations routing middleware
 */
// exports.hasAuthorization = function(req, res, next) {
//     if (req.article.User.id !== req.user.id) {
//       return res.send(401, 'User is not authorized');
//     }
//     next();
// };
