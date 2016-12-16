'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

var exec = require('child_process').exec;
var fs = require('fs'),
    path = require('path');
var PythonShell = require('python-shell');
var escapeJSON = require('escape-json-node');


exports.setParams = function(req, res, next, value) {
    if (value == "3" || value == "5"){
        req.year = value;
    }
    else{       
        req.semester = value;        
    }
    return next();
};

exports.setStudentId = function(req, res, next, id) {  
    req.StudentId = id;
    return next();  
};

exports.setAssignmentId = function(req, res, next, id) {  
    req.AssignmentId = id;
    return next();  
};


/**
 * Create a runAlgorithem
 */
exports.runAlgorithem = function(req, res) {
    console.log("Algorithem Activeted.");
    var dirString = path.dirname(fs.realpathSync(__filename));

    var options = {
        mode: 'json',
        pythonPath: 'python',
        scriptPath: dirString + '//..//algo',
        args: [req.year, req.semester]
    };

    PythonShell.run('algoritm.py', options, function (err, results) {
        console.log(results);
        if (err) throw err; // yana: fix this to better error catching
        return res.jsonp(results);
    });

};

exports.getByAssignmentId = function(req, res, next) {
     db.StudentInStudio.findAll({where: {AId: req.AssignmentId}}).then(function(studentinstudio){
         console.log(studentinstudio);
        if(!studentinstudio) {
            // return next(new Error('Failed to load studentincourse ' +  req.userId + " " + req.courseId));
            return res.jsonp(null);
        } else {
            return res.jsonp(studentinstudio);          
        }
    }).catch(function(err){
        return next(err);
    });   
};

exports.getByAssignmentIdandStudentId = function(req, res, next) {
     db.StudentInStudio.findAll({where: {AId: req.AssignmentId, IdStudent: req.StudentId }}).then(function(studentinstudio){
         console.log(studentinstudio);
        if(!studentinstudio) {
            // return next(new Error('Failed to load studentincourse ' +  req.userId + " " + req.courseId));
            return res.jsonp(null);
        } else {
            return res.jsonp(studentinstudio);          
        }
    }).catch(function(err){
        return next(err);
    });   
};





