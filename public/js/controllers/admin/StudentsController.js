angular.module('mean.system').controller('StudentsController', ['$scope', '$resource' ,'Global', '$window','Upload','$location','Students','Studios','$stateParams',
'Preferences','StudentInStudio','Instructors','Tzs','$state','$http','StudentInCourse','Courses'
,function ($scope, $resource ,Global,$window,Upload,$location,Students,Studios,$stateParams,Preferences,StudentInStudio,Instructors,Tzs,$state,$http,StudentInCourse,Courses) {
    console.log("StudentsController");
    $scope.status = null;
    $scope.error = null;
    $scope.showuser = true;
    $scope.preferences = [];
    $scope.studentinstudio = [];
    $scope.studentincourse = [];
    $scope.years = {"3": 3, "4":4, "5":5};
    $scope.statuses = {"true": true, "false":false};
    
    $scope.create = function(){
        var tz = new Tzs({
            id : $scope.tz
        });
        tz.$save(function(response) {
            $scope.error = null;
            $scope.status = "Uploaded successfully id number: " + $scope.tz ;
            $scope.tz = null;
        });
        $scope.status = null;
        $scope.error = "There was an error while uploding the id: " + $scope.tz;
        $scope.tz = null;
    }

    $scope.addIds = function(){
        $scope.upload = Upload.upload({
                url: '/upload',
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'},
                file: $scope.Ids           
            }).success(function (response, status) {
                    $scope.TzFile = response[0].filename;
                    $http.get('/insertTz/' + $scope.TzFile).success(function(respData){ //yana: do I need to set the config.server????
                        if (respData == 'done'){
                            $scope.error = null;
                            $scope.status = "File uploaded successfully.";
                            $scope.Ids = null;
                        }
                        else{
                            $scope.Ids = null;
                            $scope.status = null;
                            $scope.error = "There was an error. File could not be uploaded.";                          
                        }
                    })
                    //yana: complete when there is algotrithem.
                }
            ).error(function (errorResponse) {
                // $scope.error = errorResponse.data;
                $scope.Ids = null;
                $scope.status = null;
                $scope.error = "There was an error. File could not be uploaded.";
                }
            );
    }

    $scope.findStudent = function() {
        Students.get({
            studentId: $stateParams.studentId
        }, function(student) {
            $scope.student = student;
        });
    }

    $scope.findOne = function() {
        Students.get({
            studentId: $stateParams.studentId
        }, function(student) {
            $scope.student = student;
        });

        Studios.query(function (studios) {
            $scope.studios = studios;
        })

        Courses.query(function (courses) {
            $scope.courses = courses;
        })

        Instructors.query(function (instructors) {
            $scope.instructors = instructors;
            console.log(instructors);
        })

        StudentInStudio.query(function(studentinstudio) {
            studentinstudio.forEach(function(sis) {
                if (sis.IdStudent == $stateParams.studentId){
                    $scope.studios.forEach(function(studio) {
                        if(studio.id == sis.Studio){
                            sis.Studio = studio.Name;
                        }
                    }, this);
                    $scope.instructors.forEach(function(instructor) {
                        if(sis.Instructor == instructor.id){
                            sis.Instructor = instructor.FirstName + " " + instructor.LastName;
                        }
                    }, this);

                    $scope.studentinstudio.push(sis);
                }              
            }, this);

        });

        StudentInCourse.query(function(studentincourse) {
            studentincourse.forEach(function(sic) {
                if (sic.IdStudent == $stateParams.studentId){
	                $scope.courses.forEach(function(course) {
                        if(course.Id == sic.IdCourse){
                            sic.CourseName = course.Name;
                        }
                    }, this);                    
                    $scope.studentincourse.push(sic);
                }              
            }, this);
        });        

        Preferences.query(function(preferences) {
            preferences.forEach(function(preference) {
                if (preference.Id == $stateParams.studentId){
                    $scope.preferences.push(preference); //yana: check if data relavent?
                }    
            }, this);
            $scope.preferences.forEach(function(preference) {
                $scope.studios.forEach(function(studio) {
                    if(studio.id == preference.IdS){
                        preference.IdS = studio.Name;
                    }
                }, this);
            }, this);
        });
    };

     $scope.find = function() {
         //yana:update status registration if active.
        Students.query(function(students) {
            $scope.students = students; //yana: check if data relavent?
            // $scope.showreg = true;
        });
    };

    $scope.update = function() {
        var student = $scope.student;
        if (!student.updated) {
            student.updated = [];
        }
        student.updated.push(new Date().getTime());
        student.$update(function() {
        $state.go('StudentInfo',{studentId : student.id})

        });
    };

    $scope.remove = function(student) {
        if (student) {
            student.$remove();  
            for (var i in $scope.students) {
                if ($scope.students[i] === student) {
                    $scope.students.splice(i, 1);
                }
            }
        }
        else {
            $scope.student.$remove();
            $state.go('student'); //yana: test
        }
    };

    $scope.removeView = function(student) {
        if (student) {
            student.$remove();  
            $state.go('ViewStud');
        }
        else {
            $scope.student.$remove();
            $state.go('ViewStud'); //yana: test
        }
    };

    $scope.filterYearOptions = {
        stores: [
        {id : 2, name : 'סנן לפי שנה...', years: 'סנן לפי שנה...' },
        {id : 3, name : '3', years: 3 },
        {id : 4, name : '4', years: 4 },
        {id : 5, name : '5', years: 5 }
        ]
    };

    $scope.filterYear = {
        store: $scope.filterYearOptions.stores[0]
    }

    $scope.yearFilter = function (data) {
        if (parseInt(data.CurrentYear) === $scope.filterYear.store.years) {
            return true;
        } else if ($scope.filterYear.store.years === 'סנן לפי שנה...') {
            return true;
        } else {
            return false;
        }
    }; 

    $scope.find();


}]);