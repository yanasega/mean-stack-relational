
angular.module('mean.system').factory("Courses", ['$resource', function($resource) {
    return $resource('courses/:courseId', {
        courseId: '@Id'
    }, {
        update: {
            method: 'PUT'
        },

       save: {
           method: 'POST',
           params:{courseId:''}
        }
    });

}]);


