'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

exports.student = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Student.find({where: {id: id}}).then(function(student){
        if(!student) {
            return next(new Error('Failed to load student ' + id));
        } else {
            
            req.student = student;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

exports.create = function(req, res) {
    // augment the article by adding the UserId
    //req.body.UserId = req.user.id;
    // save and return and instance of article on the res object. 
    db.Student.create(req.body).then(function(student){
        if(!student){
            return res.send('users/signup', {errors: new StandardError('Student could not be created')}); //yana:change the landing page.
        } else {
            return res.jsonp(student);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

exports.all = function(req, res) {
    db.Student.findAll().then(function(student){
        return res.jsonp(student);
    }).catch(function(err){
        return res.render('500', {
            error: err,
            status: 500
        });
    });
};

exports.update = function(req, res) {
    // create a new variable to hold the article that was placed on the req object.
    
    var student = req.student;
    student.updateAttributes({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Gender: req.body.Gender,
        Semester: req.body.Semester,
        CurrentYear: req.body.CurrentYear,
        Generalaverage: req.body.Generalaverage,
        LastStudioGrade: req.body.LastStudioGrade,
        IsValid:req.body.IsValid
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.render('error', {
            error: err, 
            status: 500
        });
    });
};

exports.show = function(req, res) {
    // Sending down the registration that was just preloaded by the registrations.registration function
    // and saves registration on the req object.
    return res.jsonp(req.student);
};

/**
 * Delete an student
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var student = req.student;
    student.destroy().then(function(){
        db.User.find({where: {id: student.id}}).then(function(user){
            if(user) {
                user.destroy().then(function(){});
            }
        }).catch(function(err){
            return res.render('error', {
            error: err,
            status: 500
            });
        });        
        return res.jsonp(student);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};