angular.module('mean.system').controller('InsertPreferencesController', ['$scope', '$resource', 'Registrations' ,'Global', '$window',function ($scope, $resource , Registrations,Global,$window) {
    console.log("InsertPreferencesController");
    $scope.global = Global;
    $scope.RegOpen = true;
    

}]);
