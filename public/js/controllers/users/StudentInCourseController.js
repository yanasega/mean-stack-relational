angular.module('mean.system').controller('StudentInCourseController', ['$scope', '$resource' ,'Global', 'StudentInCourse','Courses','$window','$http',function ($scope, $resource ,Global ,StudentInCourse ,Courses,$window,$http) {
    console.log("StudentInCourseController");
    $scope.global = Global;
    $scope.showcourse = true; 
    $scope.status = null;   

    // Initialization
    $scope.areAllCoursesSelected = false;
    $scope.updateCourseSelection = function (courseArray, selectionValue) {
      for (var i = 0; i < courseArray.length; i++)
      {
        courseArray[i].isSelected = selectionValue;
      }
    };

     $scope.find = function() {
        Courses.query(function(courses) {
            $scope.courses = courses;
            $scope.showcourse = true;
            StudentInCourse.query(function(studentincourse) {
                studentincourse.forEach(function(sid) {
                    if(sid.IdStudent == $scope.global.user.id){
                        $scope.courses.forEach(function(course) {
                            if (course.Id == sid.IdCourse){
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
            $http.get('/getstudentincourse/' + course.Id + "/" + $scope.global.user.id).success(function(respData){
                if(respData == null){
                    if (course.isSelected == true){
                        var sic = new StudentInCourse({
                            IdStudent: $scope.global.user.id, //the id of the current user
                            IdCourse: course.Id,
                            IsDone: course.isSelected
                        });
                        sic.$save(function(response) {
                            $scope.status = "Selection saved successfully.";
                            $scope.showcourse = false;
                        });
                    }
                    else{
                        var sic = new StudentInCourse({
                            IdStudent: $scope.global.user.id,
                            IdCourse: course.Id,
                            IsDone: false
                        });

                        sic.$save(function(response) {
                            $scope.status = "Selection saved successfully.";
                            $scope.showcourse = false;
                        });               
                    }
                }
                else{
                    console.log(respData);
                    var studentincourse = respData;
                    if (course.isSelected == true){
                        studentincourse.IsDone = course.isSelected;
                    }
                    else{
                        studentincourse.IsDone = false;
                    }
                    if (!studentincourse.updated) {
                        studentincourse.updated = [];
                    }
                    studentincourse.updated.push(new Date().getTime());
                    studentincourse.$update(function() {
                        $scope.status = "Selection saved successfully.";
                        $scope.showcourse = false;
                    });                 
                }
            }).error(function () {
               $scope.status = "There was an error in saving the data.";
            });
        }, this);

        // $scope.status = "Selection saved successfully.";
    }

   
    $scope.find();
    


}]);