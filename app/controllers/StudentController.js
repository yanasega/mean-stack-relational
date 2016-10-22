'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

exports.student = function(req, res, next, id) {
    console.log('id => ' + id);
    db.User.find({where: {id: id}}).then(function(student){
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

exports.all = function(req, res) {
    db.User.findAll().then(function(student){
        return res.jsonp(student);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.update = function(req, res) {
    // create a new variable to hold the article that was placed on the req object.
    var student = req.student;
    student.updateAttributes({
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
        return res.jsonp(student);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};