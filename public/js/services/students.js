angular.module('mean.system').factory("Students", ['$resource', function($resource) {
    return $resource('students/:studentId', {
        registrationId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

}]);
