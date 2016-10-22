'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

/**
 * Find article by id
 * Note: This is called every time that the parameter :articleId is used in a URL. 
 * Its purpose is to preload the article on the req object then call the next function. 
 */
exports.studentinstudio = function(req, res, next, id) {
    console.log('id => ' + id);
    db.StudentInStudio.find({where: {id: id}}).then(function(studentinstudio){
        if(!studentinstudio) {
            return next(new Error('Failed to load studentinstudio ' + id));
        } else {
            req.studentinstudio = studentinstudio;
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
    console.log(req.body);
    db.StudentInStudio.create(req.body).then(function(studentinstudio){
        if(!studentinstudio){
            return res.send('users/signup', {errors: new StandardError('studentinstudio could not be created')}); //yana:change the landing page.
        } else {
            return res.jsonp(studentinstudio);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a studio
 */
exports.update = function(req, res) {
    // create a new variable to hold the studentinstudio that was placed on the req object.
    var studentinstudio = req.studentinstudio;
    studentinstudio.updateAttributes({
        Studio: req.body.Studio,
        Instructor: req.body.Instructor
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.render('500', {
            error: err, 
            status: 500
        });
    });
};

/**
 * Delete an studio
 */
exports.destroy = function(req, res) {
    // create a new variable to hold the article that was placed on the req object.
    var studentinstudio = req.studentinstudio;

    studentinstudio.destroy().then(function(){
        return res.jsonp(studentinstudio);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an studentinstudio
 */
exports.show = function(req, res) {
    // Sending down the studentinstudio that was just preloaded by the studentinstudios.studentinstudio.article function
    // and saves article on the req object.
    return res.jsonp(req.studentinstudio);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.StudentInStudio.findAll().then(function(studentinstudio){
        return res.jsonp(studentinstudio);
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
