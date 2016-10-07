angular.module('mean.system').controller('StudentInCourseController', ['$scope', '$resource' ,'Global', 'StudentInCourses','Courses','$window',function ($scope, $resource ,Global ,StudentInCourses ,Courses,$window) {
    console.log("StudentInCourseController");
    $scope.global = Global;
    $scope.showcourse = true; 
    $scope.status = null;   

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
            StudentInCourses.query(function(StudentInCourses) {
                console.log(StudentInCourses);
                StudentInCourses.forEach(function(sid) {
                    if(sid.IdStudent == $scope.global.user.id){
                        $scope.courses.forEach(function(course) {
                            if (course.id == sid.IdCourse){
                                course.isSelected = sid.IsDone;
                            }
                        }, this);
                    }
                }, this);
            });
        });

    };

    $scope.updateForm = function(){
        $scope.courses.forEach(function(course) {
            if (course.isSelected == true){
                var sic = new StudentInCourses({
                    IdStudent: $scope.global.user.id, //the id of the current user
                    IdCourse: course.id,
                    IsDone: course.isSelected
                });
 
                sic.$save(function(response) {
                     $scope.status = "Selection saved successfully.";
                });
            }
            else{
                 var sic = new StudentInCourses({
                    IdStudent: $scope.global.user.id,
                    IdCourse: course.id,
                    IsDone: false
                });

                sic.$save(function(response) {
                     $scope.status = "Selection saved successfully.";
                });               
            }
        }, this);

        // $scope.id = null;
        // $scope.Name = null;
        // $scope.CreditPoints = null;
        $scope.status = "Selection saved successfully.";
    }

   
    $scope.find();
    


}]);