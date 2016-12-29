angular.module('mean.system').controller('StudentInCourseController', ['$scope', '$resource' ,'Global', 'StudentInCourse','Courses','$window','$http',
'Students','StudentManagedCourse',function ($scope, $resource ,Global ,StudentInCourse ,Courses,$window,$http,Students,StudentManagedCourse) {
    console.log("StudentInCourseController");
    $scope.global = Global;
    $scope.showcourse = true; 
    $scope.status = null;   
    $scope.exchange = false;
    $scope.MandatoryCourses = [];
    $scope.MandatoryChoiceCourses = [];
    $scope.DesignChoiceCourses = [];
    $scope.SpecialProjectsCourses = [];
    $scope.GeneralChoiceCourses = [];
    $scope.FreeChoiceCourses = [];
    $scope.ExtraCourses = [];
    $scope.loaderror = null;
    $scope.adderror = null; 
    $scope.updateerror = null;
    $scope.delerror = null; 

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
            courses.forEach(function(course) {
                $scope.loaderror = false;
                    $scope.showcourse = true;
                if(course.CourseType == "mandatory"){
                    $scope.MandatoryCourses.push(course); 
                }
                else if(course.CourseType == "mandatory_choice"){
                    $scope.MandatoryChoiceCourses.push(course); 
                }
                else if(course.CourseType == "design_choice"){
                    $scope.DesignChoiceCourses.push(course); 
                }
                else if(course.CourseType == "general_choice"){
                    $scope.GeneralChoiceCourses.push(course); 
                }
            }, this);
            //$scope.courses = courses;
            $scope.showcourse = true;
            $http.get('/getstudentincourse/' + $scope.global.user.id).success(function(studentincourse){
                studentincourse.forEach(function(sid) {
                        $scope.loaderror = false;
                        $scope.showcourse = true;
                        $scope.MandatoryCourses.forEach(function(course) {
                            if (course.Id == sid.IdCourse){
                                course.isSelected = sid.IsDone;
                            }
                        }, this);
                        $scope.MandatoryChoiceCourses.forEach(function(course) {
                            if (course.Id == sid.IdCourse){
                                course.isSelected = sid.IsDone;
                            }
                        }, this);
                        $scope.DesignChoiceCourses.forEach(function(course) {
                            if (course.Id == sid.IdCourse){
                                course.isSelected = sid.IsDone;
                            }
                        }, this);
                        $scope.GeneralChoiceCourses.forEach(function(course) {
                            if (course.Id == sid.IdCourse){
                                course.isSelected = sid.IsDone;
                            }
                        }, this);
                }, this);

            }).error(function(err){
                $scope.loaderror = true;
                $scope.showcourse = true;
            })

            $http.get('/getstudentmanagedcourse/' + $scope.global.user.id).success(function(studentmanagedcourse){
                studentmanagedcourse.forEach(function(smc) {
                    $scope.loaderror = false;
                    $scope.showcourse = true;
                    if(smc.IdStudent == $scope.global.user.id){
                        if (smc.CourseType == 'special_projects'){
                            $scope.SpecialProjectsCourses.push(smc);
                        }
                        else if (smc.CourseType == 'free_choice'){
                            $scope.FreeChoiceCourses.push(smc);
                        }
                        else if (smc.CourseType == 'extra'){
                            $scope.ExtraCourses.push(smc);
                        }
                    }
                }, this);
            }).error( function (err){ 
                $scope.loaderror = true;
                $scope.showcourse = true;
            })           
        }, function (err){ 
            $scope.loaderror = true;
            $scope.showcourse = true;
        });

    };

    $scope.updateForm = function(courses){
        courses.forEach(function(course) {
            $http.get('/getstudentincourse/' + course.Id + "/" + $scope.global.user.id).success(function(respData){
                if(respData == null){ // does not exist
                    if (course.isSelected == true){
                        var sic = new StudentInCourse({
                            IdStudent: $scope.global.user.id, //the id of the current user
                            IdCourse: course.Id,
                            IsDone: course.isSelected
                        });
                        sic.$save(function(response) {
                            $scope.updateerror = false;
                            //$scope.showcourse = false;
                        }, function (err){ 
                            $scope.updateerror = true;
                            $scope.showcourse = true;
                        });
                    }
                    else{
                        var sic = new StudentInCourse({
                            IdStudent: $scope.global.user.id,
                            IdCourse: course.Id,
                            IsDone: false
                        });
                        sic.$save(function(response) {
                            $scope.updateerror = false;
                            //$scope.showcourse = false;
                        }, function (err){ 
                            $scope.updateerror = true;
                            $scope.showcourse = true;
                        });              
                    }
                }
                else{ //already exits
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
                        $scope.updateerror = false;
                    }, function (err){ 
                            $scope.updateerror = true;
                            $scope.showcourse = true;
                        });                
                }
            }).error(function () {
                $scope.showcourse = true;
                $scope.updateerror = true;
            });
        }, this);
        
        //allow students that have finished their graduation forms to insert preferences to year 5 studios.
        $scope.activated = true;
        if($scope.exchange){
            angular.forEach(courses,function(course,key){
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
                        }, function (err){ 
                            $scope.updateerror = true;
                            $scope.showcourse = true;
                        });
                }, function (err){ 
                    $scope.loaderror = true;
                    $scope.showcourse = true;
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
                        }, function (err){ 
                            $scope.updateerror = true;
                            $scope.showcourse = true;
                        });
                }, function (err){ 
                    $scope.loaderror = true;
                    $scope.showcourse = true;
                });              
            }
        }
    }

    $scope.addCourse = function(type) {
        var studentmanagedcourse = new StudentManagedCourse({
			IdStudent: $scope.global.user.id,
            IdCourse: $scope.id[type],
			Name: $scope.name[type],
            CourseType: type,
            CreditPoints: $scope.creditpoints[type]
        });
        studentmanagedcourse.$save(function(response) {
            $scope.adderror = false; 
            $scope.showcourse = true;
            if(type == "special_projects"){
                $scope.SpecialProjectsCourses.push(studentmanagedcourse); 
            }
            else if(type == "free_choice"){
                $scope.FreeChoiceCourses.push(studentmanagedcourse); 
            }
            else{
                $scope.ExtraCourses.push(studentmanagedcourse);
            }
        }, function (err){
            $scope.adderror = true;
            $scope.showcourse = true;
        });
        $scope.clear();
    };

    $scope.remove = function(c) {
        if (c) {
            var course = new StudentManagedCourse({
                id:c.id,
                IdStudent: $scope.global.user.id,
                IdCourse: c.IdCourse,
                Name: c.Name,
                CourseType: c.CourseType,
                CreditPoints: c.CreditPoints
            });
            course.$remove(
                function(response){
                    $scope.delerror = false;
                    $scope.showcourse = true;
                },
                function(err){
                    $scope.delerror = true;
                    $scope.showcourse = true;
                }
            );  
            if(c.CourseType == "special_projects"){
                for (var i in $scope.SpecialProjectsCourses) {
                    if ($scope.SpecialProjectsCourses[i] === c) {
                        $scope.SpecialProjectsCourses.splice(i, 1);
                    }
                }
            }
            else if(c.CourseType == "free_choice"){
                for (var i in $scope.FreeChoiceCourses) {
                    if ($scope.FreeChoiceCourses[i] === c) {
                        $scope.FreeChoiceCourses.splice(i, 1);
                    }
                }
            }
            else{
                for (var i in $scope.ExtraCourses) {
                    if ($scope.ExtraCourses[i] === c) {
                        $scope.ExtraCourses.splice(i, 1);
                    }
                }
            }
        }
        else {
            $scope.course.$remove();
        }
        $scope.clear();
    };

    $scope.clear = function(){
        $scope.id = null;
        $scope.name = null;
        $scope.creditpoints = null;
    };
    
    $scope.find();
    


}]);