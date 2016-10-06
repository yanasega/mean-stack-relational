angular.module('mean.system').controller('GradeInCourseController', ['$scope', '$resource' ,'GradeInCourses','Global', '$window',function ($scope, $resource ,GradeInCourses,Global,$window) {
    console.log("GradeInCourseController");
    $scope.global = Global;
    $scope.showcors = true;
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
        $scope.coursename = null;
        $scope.coursenumber = null;
        $scope.creditpoints = null;
        $scope.grade = null;
        $scope.status = "Course added successfully.";

    };
 
     $scope.find = function() {
         //yana:update status registration if active.
        GradeInCourses.query(function(gradeincourses) {
            $scope.gradeincourses = gradeincourses; //yana: check if data relavent?
            // $scope.showreg = true;
        });
    };

    $scope.findOne = function() {
        GradeInCourses.get({
            gradeincourseId: $stateParams.gradeincourseId
        }, function(gradeincourse) {
            $scope.gradeincourse = gradeincourse;
            // $scope.registration.Start_date = new Date($scope.registration.Start_date);
            // $scope.registration.End_date = new Date($scope.registration.End_date);
        });
    };

    $scope.update = function() {
        // $scope.registration.startdate =  new Date($scope.registration.startdate);
        // $scope.registration.enddate =  new Date($scope.registration.enddate);
        var gradeincourse = $scope.gradeincourse;
        if (!gradeincourse.updated) {
            gradeincourse.updated = [];
        }
        // registration.updated.push(new Date().getTime());
        gradeincourse.$update(function() {
            $state.go('DegCalc',{gradeincourseId : gradeincourse.id})

        });
    };
   
    $scope.remove = function(gradeincourse) {
        if (gradeincourse) {
            gradeincourse.$remove();  
            for (var i in $scope.gradeincourses) {
                if ($scope.gradeincourses[i] === gradeincourse) {
                    $scope.gradeincourses.splice(i, 1);
                }
            }
        }
        else {
            $scope.gradeincourse.$remove();
            $state.go('gradeincourses'); //yana: test
        }
    };

    // $scope.checkIsActive = function(){
    //     if ($scope.startdate < Date.now() && $scope.enddate > Date.now()){
    //         $scope.IsActive = true;
    //     }
    //     else{
    //         $scope.IsActive = false;
    //     }
    // }

    $scope.find();

}]);
