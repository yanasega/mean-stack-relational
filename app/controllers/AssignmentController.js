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
/**
 * Find assignment by id
 * Note: This is called every time that the parameter :articleId is used in a URL. 
 * Its purpose is to preload the article on the req object then call the next function. 
 */
exports.assignment = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Assignment.find({where: {id: id}}).then(function(assignment){
        if(!assignment) {
            return next(new Error('Failed to load assignment ' + id));
        } else {
            req.assignment = assignment;
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
 //   augment the article by adding the UserId
    req.body.UserId = req.user.id;
   // save and return and instance of article on the res object. 
    db.Assignment.create(req.body).then(function(assignment){
        if(!assignment){
            return res.status(500).send({errors: new StandardError('assignment could not be created')});
        } else {
            return res.jsonp(assignment);
        }
    }).catch(function(err){
             return res.status(500).send({status:500, message:'internal error: ' + err});

    });
};

/**
 * Update a assignment
 */
exports.update = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var assignment = req.assignment;
    assignment.updateAttributes({
		IsShow: req.body.IsShow
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.render('error', {
            error: err, 
            status: 500
        });
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var assignment = req.assignment;

    assignment.destroy().then(function(){
        return res.jsonp(assignment);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show a registration
 */
exports.show = function(req, res) {
    // Sending down the assignment that was just preloaded by the assignments.assignment function
    // and saves assignment on the req object.
    return res.jsonp(req.assignment);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Assignment.findAll().then(function(assignment){
        return res.jsonp(assignment);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.downloadass = function(req, res){
    console.log("Download Activeted.");
    var dirString = path.dirname(fs.realpathSync(__filename));

    var options = {
        mode: 'json',
        pythonPath: 'python',
        scriptPath: dirString + '//..//algo',
        args: [req.assignment.id]
    };
    console.log(req.assignment.id);
    console.log("blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    PythonShell.run('export_assignment.py', options, function (err, results) {
        if (err) {console.log(err);return res.status(500).send({status:500, message:'internal error: ' + err}); }
        var file = dirString + '\\..\\algo\\' + results[0] + '.csv';

        var filename = path.basename(file);
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
        return res.jsonp(results + '.csv');

    });

}
/**
 * Article authorizations routing middleware
 */
// exports.hasAuthorization = function(req, res, next) {
//     if (req.article.User.id !== req.user.id) {
//       return res.send(401, 'User is not authorized');
//     }
//     next();
// };
