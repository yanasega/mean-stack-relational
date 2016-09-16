angular.module('mean.system').controller('CreateNewAssignmentController', ['$scope', '$resource','Global', '$window','Students','Studios',function ($scope, $resource,Global,$window,Students,Studios) {
    console.log("CreateNewAssignmentController");
    $scope.global = Global;
    $scope.showreg = false;
    $scope.status = null;
    $scope.models = {
        selected: null,
        listsA: {},
        listsB34: {"Students":[]},
        listsB5: {"Students":[]},
    };

    $scope.init = function(){
       $scope.find();
       // console.log($scope.createnewassignment);
        
    }

    $scope.year = ["choose year..","3rd-4th", "5th"];
    // Generate initial model
    for (var i = 1; i <= 20; ++i) {
        // $scope.models.listsB.Students.push({label: "Item A" + i});
        // $scope.models.listsA.A.push({});
        // $scope.models.listsA.B.push({});
        // $scope.models.listsA.C.push({});
        // $scope.models.listsA.D.push({});
        // $scope.models.listsA.F.push({});
        // $scope.models.listsA.G.push({});
        // $scope.models.listsA.L.push({});
        //$scope.bal = true;
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);


    $scope.uploadAll = function(){
        Students.query(function(students) {
           $scope.students = students; 
           console.log(students);
           students.forEach(function(student) {
            if("student.currentyear =='3rd'" || "student.currentyear =='4th'"){
                console.log({student});
                console.log(student);
                $scope.models.listsB34.Students.push({student});
                console.log(listsB34);
            }   
            else{
                $scope.models.listsB5.Students.push({student});
            }
           }, this);
       })
           Studios.query(function(studios) {
           $scope.studios = studios; 
       })       
       
    }

    

}]);


