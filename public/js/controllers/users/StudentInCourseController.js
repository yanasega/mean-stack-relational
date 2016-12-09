angular.module('mean.system').controller('StudentInCourseController', ['$scope', '$resource' ,'Global', 'StudentInCourse','Courses','$window','$http','Students',function ($scope, $resource ,Global ,StudentInCourse ,Courses,$window,$http,Students) {
    console.log("StudentInCourseController");
    $scope.global = Global;
    $scope.showcourse = true; 
    $scope.status = null;   
    $scope.exchange = false;
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
                            $scope.status = "השינויים נשמרו.";
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
                            $scope.status = "השינויים נשמרו.";
                            $scope.showcourse = false;
                        });               
                    }
                }
                else{
                    var studentincourse = new StudentInCourse({
                        IdStudent: respData.IdStudent, 
                        IdCourse: respData.IdCourse,
                        IsDone: respData.IsDone
                    });
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
                        $scope.status = "השינויים נשמרו.";
                        $scope.showcourse = false;
                    });                 
                }
            }).error(function () {
               $scope.status = "התרחשה שגיאה בעת שמירת הנתונים.";
            });
        }, this);
        
        //allow students that have finished their graduation forms to insert preferences to year 5 studios.
        $scope.activated = true;
        if($scope.exchange){
            angular.forEach($scope.courses,function(course,key){
                if (!course.isSelected){
                    $scope.activated = false;
                }
            });
            if ($scope.activated){
                Students.get({
                    studentId: $scope.global.user.id
                }, function(student) {
                        student.IsValid = true;
                        if (!student.updated) {
                            student.updated = [];
                        }
                        student.updated.push(new Date().getTime());
                        student.$update(function() {
                        });
                });
            }
            else{
                Students.get({
                    studentId: $scope.global.user.id
                }, function(student) {
                        student.IsValid = false;
                        if (!student.updated) {
                            student.updated = [];
                        }
                        student.updated.push(new Date().getTime());
                        student.$update(function() {
                        });
                });                
            }
        }
    }

   
    $scope.find();
    


}]);