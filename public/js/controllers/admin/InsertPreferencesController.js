angular.module('mean.system').controller('InsertPreferencesController', ['$scope', '$resource', 'Registrations' ,'Global', '$window',function ($scope, $resource , Registrations,Global,$window) {
    console.log("InsertPreferencesController");
    $scope.global = Global;
    $scope.RegOpen = true;
    $scope.doneUpdate = false;
    
    $scope.checkReg = function(){
        Registrations.query(function(registrations) {
            registrations.forEach(function(registration) {
                if (registration.)
            }, this);
        });
    }

    $scope.checkReg();
}]);


