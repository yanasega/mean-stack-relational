angular.module('mean.system').controller('RegistrationController', ['$scope', '$resource' ,'Global', function ($scope, $resource ,Global) {
    var Reg = $resource('/api/registrations');
    console.log("RegistrationController");
    $scope.global = Global;
    $scope.startdate = null;
    $scope.enddate = null;
    $scope.semester = null;
    $scope.IsActive = null;
    $scope.status = null;

    $scope.openRegistration = function () {
        var reg = new Reg(); 
        console.log($scope.startdate);        
        //$scope.startdate = null;
        //$scope.enddate = null;
        //$scope.semester = null;
        reg.$save(function (result) {
            $scope.startdate = null;
            $scope.enddate = null;
            $scope.semester = null;
        });
        $scope.status = "Registration opened successfully.";

    }

}]);
