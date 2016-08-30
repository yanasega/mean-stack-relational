angular.module('mean.system').factory("Courses", ['$resource', function($resource) {
    return $resource('courses/:courseId', {
        courseId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

}]);
// angular.module('mean.system').service("Courses", ['$resource', function($resource) {
//     return $resource('/courses');
// }]);