angular.module('mean.system').controller('DegreeCalculatorController', ['$scope', '$resource' ,'Courses','Global', '$window',function ($scope, $resource ,Courses,Global,$window) {
    console.log("DegreeCalculatorController");
    $scope.global = Global;
    $scope.showcourse = true;
    $scope.status = null;
    
    // $scope.openRegistration = function() {
    //     var course = new Courses({
    //         coursename: $scope.coursename,
    //         coursenumber: $scope.coursenumber,
    //         creditpoints: $scope.creditpoints,
    //         grade: $scope.grade
    //     });

    // };
 
    //  $scope.find = function() {
    //     Courses.query(function(Course) {
    //         $scope.Course = Course; 
    //         $scope.showreg = true;
    //     });
    // };

    // $scope.remove = function(Course) {
    //     if (course) {
    //         course.$remove();  
    //     }
    //     else {
    //         $scope.course.$remove();
    //     }
    // };
  
    // $scope.find();

}]);
