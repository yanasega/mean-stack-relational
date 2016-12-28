angular.module('mean.system').controller('InstructorController', ['$scope', '$resource' ,'Global', 'Instructors','$window',function ($scope, $resource ,Global ,Instructors ,$window) {
    console.log("InstructorController");
    $scope.global = Global;
    $scope.showinstr = false;
    $scope.loaderror = null;
    $scope.adderror = null;    

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
            $scope.adderror = false; 
            $scope.find();
        }, function (err){
            $scope.adderror = true;
        });
        $scope.clear();
    };

     $scope.find = function() {
        Instructors.query(function(instructors) {
            $scope.instructors = instructors; 
            sleep(1500);
            $scope.showinstr = true;
            $scope.loaderror = false;
            
        }, function (err){
            $scope.showinstr = true;            
            $scope.loaderror = true;
        });
    };


    $scope.clear = function(){
        // $scope.id = null;
        $scope.firstname = null;
        $scope.lastname = null;
    };


    $scope.find();
}]);