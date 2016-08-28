angular.module('mean.system').controller('CourseController', ['$scope', '$resource' ,'Courses','Global', '$window',function ($scope, $resource ,Courses,Global,$window) {
    console.log("CourseController");
    $scope.global = Global;
    $scope.showcors = false;
    $scope.status = null;
  
     $scope.addCourse = function() {
        var cors = new Courses({
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
        Courses.query(function(courses) {
            $scope.courses = courses; //yana: check if data relavent?
            $scope.showcors = true;
        });
    };

    $scope.remove = function(course) {
        if (course) {
            course.$remove();  

            // for (var i in $scope.registrations) {
            //     if ($scope.registrations[i] === registration) {
            //         $scope.registrations.splice(i, 1);
            //     }
            // }
        }
        else {
            $scope.course.$remove();
            //$state.go('articles');
        }
    };
  
  
    // $scope.find();

 }]);