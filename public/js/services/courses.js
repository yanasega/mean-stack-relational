angular.module('mean.system').service("Courses", ['$resource', function($resource) {
    return $resource('/courses');
}]);