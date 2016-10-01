'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

var exec = require('child_process').exec;
var fs = require('fs');
var PythonShell = require('python-shell');
var escapeJSON = require('escape-json-node');

/**
 * Create a tz
 */
exports.create = function(req, res) {
    // augment the article by adding the UserId
    //req.body.UserId = req.user.id;

    var options = {
        mode: 'text',
        pythonPath: 'python.exe',
        // pythonOptions: ['-u'],
        scriptPath: '..//algo',
        args: ['3', 'winter']
    };

    PythonShell.run('algoritm.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        // results = results.toString().replace(/\\/g, "");
        JSONString = escapeJSON(results);
        console.log(JSONString);

    });



    
    db.Tz.create(req.body).then(function(tz){
        if(!tz){
            return res.send('users/signup', {errors: new StandardError('Tz could not be created')}); //yana:change the landing page.
        } else {
            return res.jsonp(tz);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};


/**
 * Show a registration
 */
exports.show = function(req, res) {
    // Sending down the registration that was just preloaded by the registrations.registration function
    // and saves registration on the req object.
    return res.jsonp(req.tz);
};

/**
 * List of Tzs
 */
exports.all = function(req, res) {
    db.Tz.findAll().then(function(tz){
        return res.jsonp(tz);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};


