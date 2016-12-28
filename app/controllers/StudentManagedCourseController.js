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
    db.StudentManagedCourse.find({where: {id: id}}).then(function(studentincourse){
        if(!studentincourse) {
            return next(new Error('Failed to load studentincourse ' + id));
        } else {
            req.studentincourse = studentincourse;
            return next();
        }
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
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
     db.StudentManagedCourse.find({where: {IdStudent: req.userId, IdCourse : req.courseId}}).then(function(studentincourse){
        if(!studentincourse) {
            return res.jsonp(null);
        } else {
            return res.jsonp(studentincourse);
        }
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

exports.getmycourses =  function(req, res){
     db.StudentManagedCourse.findAll({where: {IdStudent: req.userId}}).then(function(studentincourse){
        if(!studentincourse) {
            return res.jsonp(null);
        } else {
            return res.jsonp(studentincourse);          
        }
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});  
    });   
}

/**
 * Create a registration
 */
exports.create = function(req, res) {
    // augment the article by adding the UserId
    //req.body.UserId = req.user.id;
    // save and return and instance of article on the res object.
    db.StudentManagedCourse.create(req.body).then(function(studentincourse){
        if(!studentincourse){
            return res.status(500).send({status:500, message:'internal error: ' + err});
        } else {
            return res.jsonp(studentincourse);
        }
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Update a studio
 */
exports.update = function(req, res) {
    // create a new variable to hold the studentinstudio that was placed on the req object.
    db.StudentManagedCourse.find({where: {IdStudent: req.body.IdStudent, IdCourse : req.body.IdCourse}}).then(function(studentincourse){
        if(!studentincourse) {
            // return next(new Error('Failed to load studentincourse ' +  req.userId + " " + req.courseId));
            return res.jsonp(null);
        } else {
            studentincourse.updateAttributes({
                IsDone: req.body.IsDone
            }).then(function(a){
                return res.jsonp(a);
            }).catch(function(err){
                return res.status(500).send({status:500, message:'internal error: ' + err});
            });
        }
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
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
        return res.status(500).send({status:500, message:'internal error: ' + err});
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
    db.StudentManagedCourse.findAll().then(function(studentincourse){
        return res.jsonp(studentincourse);
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal 22error: ' + err});
    });
};
