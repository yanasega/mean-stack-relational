// angular.module('mean.gradeincourses').factory("GradeInCourse", ['$resource', function($resource) {
//     return $resource('articles/:articleId', {
//         articleId: '@id'
//     }, {
//         update: {
//             method: 'PUT'
//         }
//     });
// }]);

angular.module('mean.system').service("GradeInCourses", ['$resource', function($resource) {
    return $resource('/gradeincourses');
}]);