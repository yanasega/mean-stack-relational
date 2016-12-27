'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

/**
 * Find registration by id
 * Note: This is called every time that the parameter :articleId is used in a URL. 
 * Its purpose is to preload the article on the req object then call the next function. 
 */

exports.setStudentId = function(req, res, next, id) {  
    req.StudentId = id;
    return next();  
};

exports.setStudioId = function(req, res, next, id) {  
    req.StudioId = id;
    return next();  
};

exports.setRegId = function(req, res, next, id) {  
    req.RegId = id;
    return next();  
};

exports.setRate = function(req, res, next, id) {  
    req.Rate = id;
    return next();  
};
exports.getPreferenceByStudentAndStudioAndReg = function(req, res, next) {
    db.Registration.max('id').then(
        function(reg){
            db.Preference.find({where: {Ids: req.StudioId, Id: req.StudentId,IdR:req.RegId }}).then(function(preference){
                // console.log(req.RegId);
                if(!preference) {
                    return res.status(500).send({errors: new StandardError('could not get preference')});
                } else {
                    return res.jsonp(preference);          
                }
            }).catch(function(err){
                return res.status(500).send({status:500, message:'internal error: ' + err});
            }) 
        }
    ).catch(function(err){
        return next(err);
    })  
};

exports.getPreferenceByStudentAndStudio = function(req, res, next) {
    db.Registration.max('id').then(
        function(reg){
            db.Preference.find({where: {Ids: req.StudioId, Id: req.StudentId,IdR:reg }}).then(function(preference){
                // console.log(req.RegId);
                if(!preference) {
                    return res.status(500).send({errors: new StandardError('could not get preference')});
                } else {
                    return res.jsonp(preference);          
                }
            }).catch(function(err){
                return res.status(500).send({status:500, message:'internal error: ' + err});
            }) 
        }
    ).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    })  
};

exports.getPreferenceByStudentId = function(req, res, next) {
    db.Registration.max('id').then(
        function(reg){
            db.Preference.findAll({where: {Id: req.StudentId,IdR:reg, Rate:{$in: [1,2,3, 4] }}}).then(function(preference){
                //console.log(preference);
                if(!preference) {
                    return res.status(500).send({errors: new StandardError('could not get preference')});
                } else {
                    return res.jsonp(preference);          
                }
            }).catch(function(err){
                return res.status(500).send({status:500, message:'internal error: ' + err});
            }) 
        }
    ).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    })  
};


exports.preference = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Preference.find({where: {id: id}}).then(function(preference){
        if(!preference) {
            return next(new Error('Failed to load preference ' + id));
        } else {
            req.preference = preference;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Create a preference
 */
exports.create = function(req, res) {

    db.Preference.create(req.body).then(function(preference){
        if(!preference){
            return res.send('users/signup', {errors: new StandardError('Preference could not be created')}); //yana:change the landing page.
        } else {
            return res.jsonp(preference);
        }
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

/**
 * Update a registration
 */
exports.update = function(req, res) {
    
    db.Preference.find({where: {Id: req.StudentId,IdR:req.RegId, IdS:req.StudioId}}).then(function(preference){
        var pref = preference;
        pref.updateAttributes({
            Rate: req.Rate
        }).then(function(a){
            return res.jsonp(a);
        }).catch(function(err){
            return res.status(500).send({status:500, message:'internal error: ' + err});            
        });        
    }).catch(function(err){
        return res.status(500).send({status:500, message:'internal error: ' + err});

    });

};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var preference = req.preference;

    preference.destroy().then(function(){
        return res.jsonp(preference);
    }).catch(function(err){
        // return res.render('error', {
        //     error: err,
        //     status: 500
        // });
        return res.status(500).send({status:500, message:'internal error: ' + err}); 
    });
};

/**
 * Show a preference
 */
exports.show = function(req, res) {
    // Sending down the preference that was just preloaded by the preferences.preference function
    // and saves preference on the req object.
    return res.jsonp(req.preference);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Preference.findAll().then(function(preference){
        return res.jsonp(preference);
    }).catch(function(err){
         return res.status(500).send({status:500, message:'internal error: ' + err});
    });
};

