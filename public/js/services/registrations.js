// angular.module('mean.registrations').factory("Registrations", ['$resource', function($resource) {
//     return $resource('articles/:articleId', {
//         articleId: '@id'
//     }, {
//         update: {
//             method: 'PUT'
//         }
//     });
// }]);

angular.module('mean.system').service("Registrations", ['$resource', function($resource) {
    return $resource('/registrations');
}]);