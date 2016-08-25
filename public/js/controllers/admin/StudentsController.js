angular.module('mean.system').controller('StudentsController', ['$scope', '$resource' ,'Global', '$window','Upload','$location',function ($scope, $resource ,Global,$window,Upload,$location) {
    console.log("StudentsController");
    $scope.status = null;
    // $scope.create = function(token) {
    //     console.log(token);
    //     $scope.upload = Upload.upload({
    //         url: '/upload',
    //         method: 'POST',
    //         headers: {'Content-Type': 'multipart/form-data'},
    //         file: token           
    //     }).success(function (response, status) {
    //             // Redirect after save
    //             $location.path('uploads/' + response._id);
    //             $scope.path = 'uploads/' + response._id;
    //             console.log($scope.path );
    //             // Clear form fields
    //         }
    //     ).error(function (errorResponse) {
    //            $scope.error = errorResponse.data;
    //         }
    //     );
    // };
$scope.create = function(token){
            Upload.upload({
            url: 'upload',
            data: {file: token}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
            console.log(resp.data);
            $scope.status = "Upload finished successfully.";
        });
        $scope.name = '';
        $scope.token = '';
}

}]);