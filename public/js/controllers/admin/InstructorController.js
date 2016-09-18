angular.module('mean.system').controller('InstructorController', ['$scope', '$resource' ,'Global', 'Instructors','$window',function ($scope, $resource ,Global ,Instructors ,$window) {
    console.log("InstructorController");
    $scope.global = Global;
    $scope.showinstr = true;    

    $scope.addInstructor = function() {
        var instructors = new Instructors({
			// id: $scope.id,
            FirstName: $scope.firstname,
			LastName: $scope.lastname
        });
        instructors.$save(function(response) {
            $scope.find();
            //yana: add check if response valid?
        });
        $scope.clear();
    };

     $scope.find = function() {
        Instructors.query(function(instructors) {
            $scope.instructors = instructors; //yana: check if data relavent?
            $scope.showInstr = true;
        });
    };


    $scope.clear = function(){
        // $scope.id = null;
        $scope.firstname = null;
        $scope.lastname = null;
    };


    $scope.find();
}]);