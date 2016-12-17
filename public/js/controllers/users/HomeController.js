angular.module('mean.system').controller('HomeController', 
['$scope', '$http', '$resource' ,'Global', 'Courses', 'Registrations','$window','$stateParams','$state'
,function ($scope, $http, $resource ,Global ,Courses ,Registrations, $window, $stateParams, $state) {
    console.log("HomeController");

    $scope.isregistrationopen = null;

    $scope.checkIfActive = function(){
        $http.get('/getregistration').success(function(reg){
            if (reg.IsActive){
                $scope.isregistrationopen = 'ההרשמה פתוחה';
            }                 
            else{
                $scope.isregistrationopen = 'ההרשמה סגורה כעת';
            }
        })
    };

    $scope.checkIfActive();

}]);