angular.module('mean.system').controller('StudentsController', ['$scope', '$resource' ,'Global', '$window','Upload','$location','Students','Studios','$stateParams',
'Preferences','StudentInStudio','Instructors','Tzs','$state','$http','StudentInCourse','Courses'
,function ($scope, $resource ,Global,$window,Upload,$location,Students,Studios,$stateParams,Preferences,StudentInStudio,Instructors,Tzs,$state,$http,StudentInCourse,Courses) {
    console.log("StudentsController");
    $scope.status = null;
    $scope.error = null;
    $scope.showuser = false;
    $scope.preferences = [];
    $scope.studentinstudio = [];
    $scope.studentincourse = [];
    $scope.years = {"3": 3, "4":4, "5":5};
    $scope.statuses = {"true": true, "false":false};
    $scope.deleteerror = null;
    $scope.loaderror = false;

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
            break;
            }
        }
    }

    $scope.create = function(){
        var tz = new Tzs({
            id : $scope.tz
        });
        tz.$save(function(response) {
            $scope.error = null;
            $scope.adderror = false;
            $scope.status = "תעודת זהות הוטענה בהצלחה: " + tz.id ;
            $scope.tz = null;
            Tzs.query(function(tzs) {
                $scope.tzs = tzs;
                // $scope.showreg = true;
            },function (err) {
                $scope.status = null;
                $scope.adderror = true;
                $scope.error = "התרחשה שגיאה בעת טעינת הנתונים";
                $scope.tz = null;

            });
        },function (err) {
            $scope.status = null;
            $scope.adderror = true;
            $scope.error = "הייתה שגיאה בעת טעינת תעודת הזהות: " + $scope.tz;
            $scope.tz = null;

        });
    }

    $scope.addIds = function(){
        $scope.upload = Upload.upload({
                url: '/upload',
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'},
                file: $scope.Ids
            }).success(function (response, status) {
                    $scope.TzFile = response[0].filename;
                    $http.get('/insertTz/' + $scope.TzFile).success(function(respData){
                        if (respData == 'done'){
                            $scope.error = null;
                            $scope.fileerror = true;
                            $scope.status = "הקובץ נטען בהצלחה";
                            $scope.Ids = null;
                            Tzs.query(function(tzs) {
                                $scope.tzs = tzs;
                            },function (err) {
                                $scope.status = null;
                                $scope.fileerror = false;

                                $scope.error = "הייתה שגיאה בעת טעינת תעודת הזהות: " + $scope.tz;
                                $scope.tz = null;

                            });
                        }
                        else{
                            $scope.Ids = null;
                            $scope.status = null;
                            $scope.fileerror = false;
                            $scope.error = "התרחשה שגיאה בזמן טעינה.";
                        }
                    })
                }
            ).error(function (errorResponse) {
                $scope.Ids = null;
                $scope.status = null;
                $scope.fileerror = false;
                $scope.error = "התרחשה שגיאה בעת הטענת הקובץ.";
                }
            );
    }

    $scope.findStudent = function() {
        Students.get({
            studentId: $stateParams.studentId
        }, function(student) {
            $scope.student = student;
        }, function (params) {
            $scope.loaderror = true;
            $scope.showuser = true;

        });
    }

    $scope.findOne = function() {
        Students.get({
            studentId: $stateParams.studentId
        }, function(student) {
            $scope.student = student;
        },function (params) {
            $scope.loaderror = true;
            $scope.showuser = true;

        });

        Studios.query(function (studios) {
            $scope.studios = studios;
        }, function (params) {
            $scope.loaderror = true;
            $scope.showuser = true;
        })

        Courses.query(function (courses) {
            $scope.courses = courses;
        }, function (params) {
            $scope.loaderror = true;
            $scope.showuser = true;
        })

        Instructors.query(function (instructors) {
            $scope.instructors = instructors;
        }, function (params) {
            $scope.loaderror = true;
            $scope.showuser = true;
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

        }, function (params) {
            $scope.loaderror = true;
            $scope.showuser = true;
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
        }, function (params) {
            $scope.loaderror = true;
            $scope.showuser = true;
        });

        Preferences.query(function(preferences) {
            preferences.forEach(function(preference) {
                if (preference.Id == $stateParams.studentId){
                    $scope.preferences.push(preference); 
                }
            }, this);
            $scope.preferences.forEach(function(preference) {
                $scope.studios.forEach(function(studio) {
                    if(studio.id == preference.IdS){
                        preference.IdS = studio.Name;
                    }
                }, this);
            }, this);
        }, function (params) {
            $scope.loaderror = true;
            $scope.showuser = true;
        });
    };

    $scope.find = function() {
        Students.query(function(students) {
            $scope.students = students;
            sleep(2500);
            $scope.showuser = true;
        }, function (params) {
            $scope.loaderror = true;
            $scope.showuser = true;

        });
        Tzs.query(function(tzs) {
            $scope.tzs = tzs;
        }, function (params) {
            $scope.loaderror = true;
            $scope.showuser = true;

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

        }, function (params) {
            $scope.updateerror = true;
            $scope.showuser = true;
        });
    };

    $scope.remove = function(student) {
        if (student) {
            student.$remove(function(data){
                $scope.deleteerror = false;
                for (var i in $scope.students) {
                    if ($scope.students[i] === student) {
                        $scope.students.splice(i, 1);
                    }
                }
            }, function (err) {
                $scope.deleteerror = true;

            });

        }
        else {
            $scope.student.$remove();
            $scope.deleteerror = false;
        }
    };

    $scope.removetz =  function (tz) {
        if (tz) {
            tz.$remove(function(data){
              $scope.delerror = false;
            }, function(err){
              $scope.delerror = true;

            });
            for (var i in $scope.tzs) {
                if ($scope.tzs[i] === tz) {
                    $scope.tzs.splice(i, 1);
                }
            }
        }
        else {
            $scope.tz.$remove(function(data){
              $scope.delerror = false;
            }, function(err){
              $scope.delerror = true;

            });
        }
    };

    $scope.removeView = function(student) {
        if (student) {
            student.$remove(function(data){
                $state.go('ViewStud');
            }, function (params) {
                $scope.deleteerror = true;

            });
        }
        else {
            $scope.student.$remove(function(data){
                $state.go('ViewStud');
            }, function (params) {
                $scope.deleteerror = true;

            });
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
