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