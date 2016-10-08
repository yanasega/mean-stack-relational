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
exports.studentincourse = function(req, res, next, id) {
    console.log('id => ' + id);
    db.StudentInCourse.find({where: {IdStudent: id}}).then(function(studentincourse){
        if(!studentincourse) {
            return next(new Error('Failed to load studentincourse ' + id));
        } else {
            req.studentincourse = studentincourse;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

exports.setCourseId = function(req, res, next, id) {
    req.courseId = id;
    return next();  
};

exports.setUserId = function(req, res, next, id) {
    req.userId = id;
    return next();  
};

exports.find = function(req, res, next) {
     db.StudentInCourse.find({where: {IdStudent: req.userId, IdCourse : req.courseId}}).then(function(studentincourse){
        if(!studentincourse) {
            // return next(new Error('Failed to load studentincourse ' +  req.userId + " " + req.courseId));
            return res.jsonp(null);
        } else {
            return res.jsonp(studentincourse);          
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
    db.StudentInCourse.create(req.body).then(function(studentincourse){
        if(!studentincourse){
            return res.send('users/signup', {errors: new StandardError('studentincourse could not be created')}); //yana:change the landing page.
        } else {
            return res.jsonp(studentincourse);
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
    var studentincourse = req.studentincourse;
    studentincourse.updateAttributes({
        IsDone: req.body.IsDone
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
    var studentincourse = req.studentincourse;

    studentincourse.destroy().then(function(){
        return res.jsonp(studentincourse);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an studentincourse
 */
exports.show = function(req, res) {
    // Sending down the studentincourse that was just preloaded by the studentincourse.studentincourse.article function
    // and saves article on the req object.
    return res.jsonp(req.studentincourse);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.StudentInCourse.findAll().then(function(studentincourse){
        return res.jsonp(studentincourse);
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
