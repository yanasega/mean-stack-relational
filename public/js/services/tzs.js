angular.module('mean.system').factory("Tzs", ['$resource', function($resource) {
    return $resource('tzs/:tzId', {
        tzId: '@id'
    }, {
        update: {
            method: 'PUT'
        },

       save: {
           method: 'POST',
           params:{tzId:''}
        }
    });

}]);