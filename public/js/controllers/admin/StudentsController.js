angular.module('mean.system').controller('StudentsController', ['$scope', '$resource' ,'Global', '$window',function ($scope, $resource ,Global,$window) {
    console.log("StudentsController");
    $scope.global = Global;
    $scope.showuser = true;    

}]);