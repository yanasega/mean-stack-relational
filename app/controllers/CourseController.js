'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

/**
 * Find course by id
 * Note: This is called every time that the parameter :articleId is used in a URL.
 * Its purpose is to preload the article on the req object then call the next function.
 */
exports.course = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Course.find({where: {Id: id}}).then(function(course){
        if(!course) {
             return next(new Error('Failed to load course ' + id));
            // return res.status(500).send({errors: new StandardError('Failed to load course')});
        } else {
            req.course = course;
            return next();
        }
    }).catch(function(err){
        return next(err);
        // return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Create a course
 */
exports.create = function(req, res) {
    // augment the article by adding the UserId
    //req.body.UserId = req.user.id;
    // save and return and instance of article on the res object.
    db.Course.create(req.body).then(function(course){
        if(!course){
            // return res.send('users/signup', {errors: new StandardError('Course could not be created')}); //yana:change the landing page.
          return res.status(500).send({errors: new StandardError('Course could not be created')});
      } else {
            return res.jsonp(course);
        }
    }).catch(function(err){
        // return res.send('users/signup', {
        //     errors: err,
        //     status: 500
        // });
         return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};


// /**
//  * Delete an article
//  */
exports.destroy = function(req, res) {
    // create a new variable to hold the article that was placed on the req object.
    var course = req.course;
    course.destroy().then(function(){
        return res.jsonp(course);
    }).catch(function(err){
        // return res.render('error', {
        //     error: err,
        //     status: 500
       //  });
        return res.status(500).send({status:500, message:'internal error: ' + err});
         });
};

// /**
//  * Show a registration
//  */
exports.show = function(req, res) {
    // Sending down the registration that was just preloaded by the registrations.registration function
    // and saves registration on the req object.
    return res.jsonp(req.course);
};

/**
 * Update a course
 */
exports.update = function(req, res) {
    // create a new variable to hold the studio that was placed on the req object.
    var course = req.course;
    course.updateAttributes({
        Id: req.body.Id,
        Name: req.body.Name,
        CreditPoints: req.body.CreditPoints,
        CourseType: req.body.CourseType
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        // return res.render('500', {
        //     error: err,
        //     status: 500
        // });
         return res.status(500).send({status:500, message:'internal error: ' + err});       
    });
};

// /**
//  * List of Articles
//  */
exports.all = function(req, res) {
    db.Course.findAll().then(function(course){
        return res.jsonp(course);
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
// exports.hasAuthorization = function(req, res, next) {
//     if (req.article.User.id !== req.user.id) {
//       return res.send(401, 'User is not authorized');
//     }
//     next();
// };
