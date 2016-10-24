angular.module('mean.system').factory("StudentInStudio", ['$resource', function($resource) {
    return $resource('/studentinstudio/:studentinstudioId', {
        studentinstudioId: '@IdStudent'
    }, {
        update: {
            method: 'PUT',
            params:{studentinstudioId:''}
        },
        save: {
           method: 'POST',
           params:{studentinstudioId:''}
        }
    });

}]);
