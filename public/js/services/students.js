angular.module('mean.system').factory("Students", ['$resource', function($resource) {
    return $resource('students/:studentId', {
        studentId: '@id'
    }, {
        update: {
            method: 'PUT'
        },
        save: {
           method: 'POST',
           params:{studentId:''}
        }
    });

}]);
