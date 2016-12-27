angular.module('mean.system').factory("Studios", ['$resource', function($resource) {
    return $resource('studios/:studioId', {
        studioId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);