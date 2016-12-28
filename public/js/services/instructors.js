// angular.module('mean.system').service("Instructors", ['$resource', function($resource) {
//     return $resource('/instructors');
// }]);

angular.module('mean.system').factory("Instructors", ['$resource', function($resource) {
    return $resource('instructors/:instructorId', {
        instructorId: '@id'
    }, {
        update: {
            method: 'PUT'
        },
        save: {
            method: 'POST',
            params: {instructorId:''}
        }
    });

}]);

