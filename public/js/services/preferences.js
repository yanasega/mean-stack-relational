angular.module('mean.system').factory("Preferences", ['$resource', function($resource) {
    return $resource('preferences/:preferenceId', {
        preferenceId: '@Id'
    }, {
        update: {
            method: 'PUT'
        },
        save: {
            method: 'POST',
            params: {preferenceId:''}
        }
    });

}]);

