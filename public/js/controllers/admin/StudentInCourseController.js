angular.module('mean.system').controller('StudentInCourseController', ['$scope', '$resource' ,'Global', 'StudentInCourses','Courses','$window',function ($scope, $resource ,Global ,StudentInCourses ,Courses,$window) {
    console.log("StudentInCourseController");
    $scope.global = Global;
    $scope.showcourse = true;    

//     // Initialization
    $scope.areAllCoursesSelected = false;
    $scope.updateCourseSelection = function (courseArray, selectionValue) {
      for (var i = 0; i < courseArray.length; i++)
      {
        courseArray[i].isSelected = selectionValue;
      }
    };

     $scope.find = function() {
        Courses.query(function(courses) {
            // console.log(courses);
            $scope.courses = courses; //yana: check if data relavent?
            $scope.showcourse = true;
        });
    };

    $scope.updateForm = function(){
        console.log("alisa");
        
        var sic = new StudentInCourses({
            id: $scope.id,
            Name: $scope.Name,
            CreditPoints: $scope.CreditPoints
        });

        sic.$save(function(response) {
            //yana: add check if response valid?
            // if(response.status === 'success'){
            //     $window.location.href = '/';
            // }
        });
        // $scope.id = null;
        // $scope.Name = null;
        // $scope.CreditPoints = null;
        $scope.status = "Selection saved successfully.";
    }

   
    $scope.find();
    


}]);