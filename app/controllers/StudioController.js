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
exports.studio = function(req, res, next, id) {
    
    console.log('id => ' + id);
    db.Studio.find({where: {id: id}}).then(function(studio){
        if(!studio) {
            return next(new Error('Failed to load studio ' + id));
        } else {
            req.studio = studio;
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
    db.Studio.create(req.body).then(function(studio){
        if(!studio){
            // return res.send('users/signup', {errors: new StandardError('Studio could not be created')}); //yana:change the landing page.
            return res.status(500).send({errors: new StandardError('Studio could not be created')});
        } else {
            return res.jsonp(studio);
        }
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Update a studio
 */
exports.update = function(req, res) {
    // create a new variable to hold the studio that was placed on the req object.
    var studio = req.studio;
    studio.updateAttributes({
        IdC: req.body.IdC,
        Name: req.body.Name,
        Instructor: req.body.Instructor,
        Subject: req.body.Subject,
        Semester: req.body.Semester,
        IsActive: req.body.IsActive,
        LinkSylabus:req.body.LinkSylabus,
        RelevantYears:req.body.RelevantYears
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Delete an studio
 */
exports.destroy = function(req, res) {
    // create a new variable to hold the article that was placed on the req object.
    var studio = req.studio;

    studio.destroy().then(function(){
        return res.jsonp(studio);
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Show an studio
 */
exports.show = function(req, res) {
    // Sending down the studio that was just preloaded by the studios.studio.article function
    // and saves article on the req object.
    return res.jsonp(req.studio);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Studio.findAll().then(function(studio){
        return res.jsonp(studio);
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};