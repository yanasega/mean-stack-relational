angular.module('mean.system').factory("StudentInCourse", ['$resource', function($resource) {
    return $resource('/studentincourse/:studentincourseId', {
        studentincourseId: '@IdStudent'
    }, {
        update: {
            method: 'PUT',
            params: {studentincourseId:''}
        },
        save: {
            method: 'POST',
            params: {studentincourseId:''}
        }
    });

}]);
