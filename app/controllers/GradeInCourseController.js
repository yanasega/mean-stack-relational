'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

/**
 * Find article by id
 * Note: This is called every time that the parameter :articleId is used in a URL. 
 * Its purpose is to preload the article on the req object then call the next function. 
 */
// exports.article = function(req, res, next, id) {
//     console.log('id => ' + id);
//     db.Article.find({where: {id: id}, include: [{model:db.User, attributes:['id', 'username', 'name']}]}).then(function(article){
//         if(!article) {
//             return next(new Error('Failed to load article ' + id));
//         } else {
//             req.article = article;
//             return next();            
//         }
//     }).catch(function(err){
//         return next(err);
//     });
// };

/**
 * Course added
 */
exports.create = function(req, res) {
    // augment the article by adding the UserId
    //req.body.UserId = req.user.id;
    // save and return and instance of article on the res object. 
    db.GradeInCourse.create(req.body).then(function(gradeincourse){
        if(!gradeincourse){
            return res.send('users/signup', {errors: new StandardError('Course could not be added')});
        } else {
            return res.jsonp(gradeincourse);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a course
 */
exports.update = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var gradeincourse = req.gradeincourse;

    gradeincourse.updateAttributes({
        coursename: req.body.coursename,
        coursenumber: req.body.coursenumber,
        creditpoints: req.body.creditpoints,
        grade: req.body.grade
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.render('error', {
            error: err, 
            status: 500
        });
    });
};
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var gradeincourse = req.gradeincourse;

    gradeincourse.destroy().then(function(){
        return res.jsonp(gradeincourse);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an article
 */
// exports.show = function(req, res) {
//     // Sending down the article that was just preloaded by the articles.article function
//     // and saves article on the req object.
//     return res.jsonp(req.gradeincourse);
// };

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.GradeInCourse.findAll().then(function(gradeincourse){
        return res.jsonp(gradeincourse);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Article authorizations routing middleware
 */
// exports.hasAuthorization = function(req, res, next) {
//     if (req.article.User.id !== req.user.id) {
//       return res.send(401, 'User is not authorized');
//     }
//     next();
// };
// $scope.getAvg = function(){
//     var avg = 0;
//     for(var i = 0; i < $scope.gradeincourse.length; i++){
//         var product = $scope.gradeincourse[i];
//         avg += (cors.grade * cors.creditpoints);
//     }
//     return avg;
// }