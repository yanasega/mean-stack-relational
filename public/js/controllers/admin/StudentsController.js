angular.module('mean.system').controller('StudentsController', ['$scope', '$resource' ,'Global', '$window','Upload','$location',function ($scope, $resource ,Global,$window,Upload,$location) {
    console.log("StudentsController");
    $scope.status = null;
    $scope.showuser = false;
    $scope.create = function(token) {
        $scope.upload = Upload.upload({
            url: '/upload',
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            file: token           
        }).success(function (response, status) {
                // Redirect after save
                $location.path('upload/' + response[0].filename);
                $scope.path = 'upload/' + response[0].filename;
                console.log($scope.path);
                $scope.status = "Upload finished successfully.";
                // Clear form fields
                        $scope.name = '';
                        $scope.token = '';
            }
        ).error(function (errorResponse) {
               $scope.error = errorResponse.data;
               $scope.status = "There was an error. File could not be uploaded.";
            }
        );
    };
// $scope.create = function(token){
//             Upload.upload({
//             url: 'upload',
//             data: {file: token}
//         }).then(function (resp) {
//             console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
//             console.log(resp.data);
//         });
//         $scope.name = '';
//         $scope.token = '';
// }

}]);