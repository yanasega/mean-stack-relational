angular.module('mean.system').controller('GradeInCourseController', ['$scope', '$resource' ,'GradeInCourses','Global', '$window',function ($scope, $resource ,GradeInCourses,Global,$window) {
    console.log("GradeInCourseController");
    $scope.global = Global;
    $scope.showcors = false;
    $scope.status = null;
  
     $scope.addCourse = function() {
        var cors = new GradeInCourses({
            coursename: $scope.coursename,
            coursenumber: $scope.coursenumber,
            creditpoints: $scope.creditpoints,
            grade: $scope.grade
           
        });
        cors.$save(function(response) {
            //yana: add check if response valid?
        });
        $scope.status = "Course added successfully.";

    };
 
     $scope.find = function() {
        GradeInCourses.query(function(gradeincourses) {
            console.log(gradeincourses);
            $scope.gradeincourses = gradeincourses; //yana: check if data relavent?
            $scope.showcors = true;
        });
    };

    $scope.remove = function(gradeincourse) {
        if (gradeincourse) {
            gradeincourse.$remove();  

            for (var i in $scope.registrations) {
                if ($scope.registrations[i] === registration) {
                    $scope.registrations.splice(i, 1);
                }
            }
        }
        else {
            $scope.gradeincourse.$remove();
            //$state.go('articles');
        }
    };
  
  
    $scope.find();

 }]);