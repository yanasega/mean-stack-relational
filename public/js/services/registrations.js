angular.module('mean.system').factory("Registrations", ['$resource', function($resource) {
    return $resource('registrations/:registrationId', {
        registrationId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });

}]);

// angular.module('mean.system').service("Registrations", ['$resource', function($resource) {
//     return $resource('/registrations');
// }]);

