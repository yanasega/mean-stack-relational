angular.module('mean.system').service("Instructors", ['$resource', function($resource) {
    return $resource('/instructors');
}]);