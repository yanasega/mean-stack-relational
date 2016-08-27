// angular.module('mean.courses').factory("GradeInCourse", ['$resource', function($resource) {
//     return $resource('articles/:articleId', {
//         articleId: '@id'
//     }, {
//         update: {
//             method: 'PUT'
//         }
//     });
// }]);

angular.module('mean.system').service("DegreeCalculators", ['$resource', function($resource) {
    return $resource('/courses');
}]);