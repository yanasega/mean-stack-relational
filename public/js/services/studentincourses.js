// angular.module('mean.system').service("Courses", ['$resource', function($resource) {
//     return $resource('/courses');
// }]);
angular.module('mean.system').factory("StudentInCourses", ['$resource', function($resource) {
    return $resource('studentincourses/:studentincourseId', {
        studentincourseId: '@id'
    }, {
        update: {
            method: 'PUT'
        },
       save: {
           method: 'POST',
           params:{studentincourseId:''}
        }
    });

}]);
// angular.module('mean.system').service("StudentInCourses", ['$resource', function($resource) {
//     return $resource('/courses');
// }]);

