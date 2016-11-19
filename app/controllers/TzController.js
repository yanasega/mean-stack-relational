'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

// var exec = require('child_process').exec;
// var fs = require('fs'),
//     path = require('path');
// var PythonShell = require('python-shell');
// var escapeJSON = require('escape-json-node');

exports.tz = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Tz.find({where: {id: id}}).then(function(tz){
        if(!tz) {
            return next(new Error('Failed to load tz ' + id));
        } else {
            req.tz = tz;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

exports.path = function(req, res, next, id) {
    req.csv_path = id;    
    return next();
};

/**
 * Create a tz
 */
exports.create = function(req, res) {
    // augment the article by adding the UserId
    //req.body.UserId = req.user.id;    
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

exports.insertTz = function (req, res){
    
    var dirString = path.dirname(fs.realpathSync(__filename));

    var csv_path = req.csv_path;
    var options = {
        mode: 'text',
        pythonPath: 'python.exe',
        // pythonOptions: ['-u'],
        scriptPath: dirString + '//..//algo',
        args: [dirString + '//..//..//public/uploads/' + csv_path]
    };

    PythonShell.run('readfile.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        // results = results.toString().replace(/\\/g, "");
        return res.jsonp(results);

    });
}

/**
 * Show a registration
 */
exports.show = function(req, res) {
    // Sending down the registration that was just preloaded by the registrations.registration function
    // and saves registration on the req object.
    return res.jsonp(req.tz);
};

exports.destroy = function(req, res) {
    // create a new variable to hold the article that was placed on the req object.
    var tz = req.tz;

    tz.destroy().then(function(){
        return res.jsonp(tz);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
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


