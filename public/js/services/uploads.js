//Articles service used for articles REST endpoint
angular.module('mean.system').factory("Uploads", ['$resource', function($resource) {
    return $resource('uploads/:uploadId', {
        articleId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);