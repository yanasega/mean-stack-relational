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
var mime = require('mime');
//var csv = require('csv');
/**
 * Find registration by id
 * Note: This is called every time that the parameter :articleId is used in a URL. 
 * Its purpose is to preload the article on the req object then call the next function. 
 */

exports.path = function(req, res, next, id) {
    req.deletepath = id;
    return next();
};

exports.getmax = function(req, res, next) {
    db.Registration.max('id').then(
        function(reg){db.Registration.find({where: {id: reg}}).then(function(registration){
                if(!registration) {
                    return res.jsonp(null);
                } else {
                    return res.jsonp(registration);          
                }
            }).catch(function(err){
                return next(err);
            }) 
        }
    ).catch(function(err){
        return next(err);
    })  
};

exports.registration = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Registration.find({where: {id: id}}).then(function(registration){
        if(!registration) {
            return next(new Error('Failed to load registration ' + id));
        } else {
            req.registration = registration;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Create a registration
 */
exports.create = function(req, res) {

    db.Registration.create(req.body).then(function(registration){
        if(!registration){
            return res.status(500).send({status:500, message:'internal error: ' + err});
            
        } else {
            return res.jsonp(registration);
        }
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Update a registration
 */
exports.update = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var registration = req.registration;
    registration.updateAttributes({
        EndDate: req.body.EndDate,
        IsActive: req.body.IsActive
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var registration = req.registration;

    registration.destroy().then(function(){
        return res.jsonp(registration);
    }).catch(function(err){
       return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Show a registration
 */
exports.show = function(req, res) {
    // Sending down the registration that was just preloaded by the registrations.registration function
    // and saves registration on the req object.
    return res.jsonp(req.registration);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    
    db.Registration.findAll().then(function(registration){
        return res.jsonp(registration);
    }).catch(function(err){
     return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

exports.downloadprefs = function(req, res){
    console.log("Download Activeted.");
    var dirString = path.dirname(fs.realpathSync(__filename));

    var options = {
        mode: 'json',
        pythonPath: 'python',
        scriptPath: dirString + '//..//algo',
        args: [11]
    };

    PythonShell.run('export_preferences.py', options, function (err, results) {
        if (err) {console.log(err);return res.status(500).send({status:500, message:'internal error: ' + err}); }
        var file = dirString + '\\..\\algo\\' + results[0] + '.csv';

        var filename = path.basename(file);
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
        return res.jsonp(results + '.csv');

    });

}

exports.deletefile = function(req,res){
    fs.unlinkSync("public//uploads//"+req.deletepath);
    return res.jsonp("success");
}

/**
 * Article authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.article.User.id !== req.user.id) {
      return res.send(401, 'User is not authorized');
    }
    next();
};
