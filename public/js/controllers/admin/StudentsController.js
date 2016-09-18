angular.module('mean.system').controller('StudentsController', ['$scope', '$resource' ,'Global', '$window','Upload','$location','Students','Studios',function ($scope, $resource ,Global,$window,Upload,$location,Students,Studios) {
    console.log("StudentsController");
    $scope.status = null;
    $scope.showuser = true;
    
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

     $scope.find = function() {
         //yana:update status registration if active.
        Students.query(function(students) {
            $scope.students = students; //yana: check if data relavent?
            // $scope.showreg = true;
        });
    };

    $scope.find();


}]);