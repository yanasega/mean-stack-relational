// var myApp = angular.module('mean.system',[]);

// myApp.controller('RegistrationController', ['$scope', 'Global',function($scope, Global) {
//   $scope.global = Global;
//   console.log("yep");
// }]);

angular.module('mean.system').controller('RegistrationController', ['$scope', 'Global', function ($scope, Global) {
    
    console.log("RegistrationController");
    $scope.global = Global;
    $scope.startdate = null;
    $scope.enddate = null;
    $scope.semester = null;
    $scope.IsActive = null;
    $scope.status = null;

    $scope.openRegistration = function () {
        console.log($scope.startdate);        
        $scope.startdate = null;
        $scope.enddate = null;
        $scope.semester = null;
        $scope.status = "Registration opened successfully.";

    }

}]);
