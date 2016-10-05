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

/**
 * Create a runAlgorithem
 */
exports.runAlgorithem = function(req, res) {
    console.log("Algorithem Activeted.");
    var dirString = path.dirname(fs.realpathSync(__filename));

    var options = {
        mode: 'json',
        pythonPath: 'python.exe',
        scriptPath: dirString + '//..//algo',
        args: [req.year, req.semester]
    };
    PythonShell.run('algoritm.py', options, function (err, results) {
        if (err) throw err; // yana: fix this to better error catching
        return res.jsonp(results);
    });

};




