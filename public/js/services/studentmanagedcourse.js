angular.module('mean.system').factory("StudentManagedCourse", ['$resource', function($resource) {
    return $resource('/studentmanagedcourse/:studentmanagedcourseId', {
        studentincourseId: '@IdStudent'
    }, {
        update: {
            method: 'PUT',
            params: {studentmanagedcourseId:''}
        },
        save: {
            method: 'POST',
            params: {studentmanagedcourseId:''}
        }
    });

}]);
