angular.module('mean.system').controller('CourseController', ['$scope', '$resource' ,'Global', 'Courses','$window',function ($scope, $resource ,Global ,Courses ,$window) {
    console.log("CourseController");
    $scope.global = Global;
    $scope.showcourse = true;    

    $scope.addCourse = function() {
        var course = new Courses({

			Id: $scope.id,
			Id_c: $scope.id,
            Name: $scope.name,
			CreditPoints: $scope.creditpoints
        });
        course.$save(function(response) {
            $scope.find();
            //yana: add check if response valid?
        });
        $scope.clear();
    };

     $scope.find = function() {
        Courses.query(function(courses) {
            $scope.courses = courses; //yana: check if data relavent?
            $scope.showcourse = true;
        });
    };

    $scope.remove = function(course) {
        if (course) {
            course.$remove();  

            for (var i in $scope.courses) {
                if ($scope.courses[i] === course) {
                    $scope.courses.splice(i, 1);
                }
            }
        }
        else {
            $scope.course.$remove();
            $state.go('courses'); //yana: test
        }
        $scope.clear();
    };

    $scope.clear = function(){
        $scope.id = null;
        $scope.name = null;
        $scope.creditpoints = null;
    };
 

    $scope.find();
}]);