angular.module('mean.system').controller('DegreeCalculatorController', ['$scope', '$resource' ,'Courses','Global', '$window',function ($scope, $resource ,Courses,Global,$window) {
    console.log("DegreeCalculatorController");
    $scope.global = Global;
    $scope.showcourse = true;
    $scope.status = null;
    
     $scope.addCourse = function() {
        var reg = new Course({
            course: $scope.Course,
            coursenumber: $scope.coursenumber,
            creditpoints: $scope.creditpoints,
            grade: $scope.grade
           
        });
consule.log("alisssssssssssssssssssssssssssssssssssssssssssssssssssssssssa");
        reg.$save(function(response) {
            //yana: add check if response valid?
consule.log("yanaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        });
        $scope.status = "Course added successfully.";

    };
 
//      $scope.find = function() {
//         Registrations.query(function(registrations) {
//             $scope.registrations = registrations; //yana: check if data relavent?
//             $scope.showreg = true;
//         });
//     };

//     $scope.remove = function(registration) {
//         if (registration) {
//             registration.$remove();  

//             // for (var i in $scope.registrations) {
//             //     if ($scope.registrations[i] === registration) {
//             //         $scope.registrations.splice(i, 1);
//             //     }
//             // }
//         }
//         else {
//             $scope.registration.$remove();
//             //$state.go('articles');
//         }
//     };
  
//     $scope.find();

// }]);
