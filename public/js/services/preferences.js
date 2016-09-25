angular.module('mean.system').factory("Preferences", ['$resource', function($resource) {
    return $resource('preferences/:preferenceId', {
        preferenceId: '@id'
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

// angular.module('mean.system').service("Registrations", ['$resource', function($resource) {
//     return $resource('/registrations');
// }]);

