angular.module('mean.system').controller('DegreeCalculatorController', ['$scope', '$resource' ,'DegreeCalculators','Global', '$window',function ($scope, $resource ,DegreeCalculators,Global,$window) {
    console.log("DegreeCalculatorController");
    $scope.global = Global;
    $scope.showcourse = true;
    $scope.status = null;
    
     $scope.addCourse = function() {
        var cors = new DegreeCalculators({
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
 
    //  $scope.find = function() {
    //     DegreeCalculators.query(function(courses) {
    //         $scope.courses = courses; //yana: check if data relavent?
    //         $scope.showreg = true;
    //     });
    // };

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