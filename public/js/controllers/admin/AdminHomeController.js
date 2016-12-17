angular.module('mean.system').controller('AdminHomeController', 
['$scope', '$http', '$resource' ,'Global', 'Courses', 'Registrations', 'Preferences', '$window','$stateParams','$state'
,function ($scope, $http, $resource ,Global ,Courses ,Registrations , Preferences, $window,$stateParams,$state) {
    console.log("AdminHomeController");

    $scope.isregistrationopen = null;

    $scope.checkIfActive = function(){
        $http.get('/getregistration').success(function(reg){
            console.log(reg.IsActive);
            if (reg.IsActive){
                $scope.isregistrationopen = "ההרשמה פתוחה";
            }                 
            else{
                $scope.isregistrationopen = "ההרשמה סגורה כעת";
            }
        })
    };

    $scope.openPdf = function(link){
        $window.open('uploads/' +link);
    }
    $scope.checkIfActive();
}]);