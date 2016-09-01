angular.module('mean.system').controller('CreateNewAssignmentController', ['$scope', '$resource', 'Registrations' ,'Global', '$window',function ($scope, $resource , Registrations,Global,$window) {
    console.log("CreateNewAssignmentController");
    $scope.global = Global;
    $scope.showreg = false;
    $scope.status = null;
    //$scope.bal = false;
    $scope.models = {
        selected: null,
        listsA: {"A":[], "B":[], "C":[],"D":[],"F":[],"G":[],"L":[]},
        listsB: {"Students":[]}
    };


    // Generate initial model
    for (var i = 1; i <= 20; ++i) {
        $scope.models.listsB.Students.push({label: "Item A" + i});
        $scope.models.listsA.A.push({});
        $scope.models.listsA.B.push({});
        $scope.models.listsA.C.push({});
        $scope.models.listsA.D.push({});
        $scope.models.listsA.F.push({});
        $scope.models.listsA.G.push({});
        $scope.models.listsA.L.push({});
        //$scope.bal = true;
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
//drop down choosing year
    $scope.actions = [
  {id: 'third/fourth', name: 'third/fourth'},
  {id: 'fifth', name: 'fifth'}
];

$scope.setAction = function(action) {
  $scope.selectedAction = action;
};

}]);


