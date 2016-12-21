angular.module('mean.system').factory("StudentManagedCourse", ['$resource', function($resource) {
    return $resource('/studentmanagedcourse/:studentincourseId', {
        studentincourseId: '@id'
    }, {
        update: {
            method: 'PUT'
        },
        save: {
            method: 'POST',
            params: {studentincourseId:''}
        }
    });


}]);
