angular.module('mean.system').controller('InstructorController', ['$scope', '$resource' ,'Global', 'Instructors','$window',function ($scope, $resource ,Global ,Instructors ,$window) {
    console.log("InstructorController");
    $scope.global = Global;
    $scope.showinstr = false;    

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
            break;
            }
        }
    }

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
            sleep(1500);
            $scope.showinstr = true;
        });
    };


    $scope.clear = function(){
        // $scope.id = null;
        $scope.firstname = null;
        $scope.lastname = null;
    };


    $scope.find();
}]);