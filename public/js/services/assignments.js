angular.module('mean.system').factory("Assignments", ['$resource', function($resource) {
    return $resource('assignments/:assignmentId', {
        assignmentId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

}]);