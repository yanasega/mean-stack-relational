angular.module('mean.system').service("SubjectMap", ['$resource', function($resource) {
    return $resource('/subjects');
}]);