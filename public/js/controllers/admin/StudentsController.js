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
    $scope.loaderror = null;
    $scope.adderror = null; 
    $scope.updateerror = null;
    $scope.delerror = null; 
    $scope.fileerror = null;


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
            $scope.status = "תעודת זהות הוטענה בהצלחה: " + tz.id ;
            $scope.tz = null;
            Tzs.query(function(tzs) {
                $scope.tzs = tzs; 
                // $scope.showreg = true;
                $scope.loaderror = false;        
               }, function (err){
                 $scope.loaderror = true;
            }); 
        $scope.adderror = false;        
        }, function (err){
            $scope.adderror = true;
        });  
        $scope.status = null;
        $scope.error = "הייתה שגיאה בעת טעינת תעודת הזהות: " + $scope.tz;
        $scope.tz = null;
    }

    $scope.addIds = function(){
        $scope.upload = Upload.upload({
                url: '/upload',
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'},
                file: $scope.Ids           
            }).success(function (response, status) {
                    $scope.fileerror = false;
                    $scope.TzFile = response[0].filename;
                    console.log($scope.TzFile);
                    $http.get('/insertTz/' + $scope.TzFile).success(function(respData){
                        if (respData == 'done'){
                            $scope.error = null;
                            $scope.status = "File uploaded successfully.";
                            $scope.Ids = null;
                            $scope.fileerror = false;
                            Tzs.query(function(tzs) {
                                $scope.tzs = tzs; 
                                // $scope.showreg = true;
                                $scope.loaderror = false;        
                             }, function (err){
                                 $scope.loaderror = true;
                             }); 
                        }
                        else{
                            $scope.Ids = null;
                            $scope.status = null;
                            $scope.error = "There was an error. File could not be uploaded.";                          
                        }
                    }).error(function (errorResponse) {
                // $scope.error = errorResponse.data;
                    $scope.fileerror = true;
                    $scope.Ids = null;
                    $scope.status = null;
                    $scope.error = "There was an error. File could not be uploaded.";
                }
            );
                    //yana: complete when there is algotrithem.
                }
            ).error(function (errorResponse) {
                // $scope.error = errorResponse.data;
                $scope.fileerror = true;
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
            $scope.loaderror = false;            
        }, function (err){
            $scope.loaderror = true;
        });
    }

    $scope.findOne = function() {
        Students.get({
            studentId: $stateParams.studentId
        }, function(student) {
            $scope.student = student;
            $scope.loaderror = false;            
        }, function (err){
            $scope.loaderror = true;
        });

        Studios.query(function (studios) {
            $scope.studios = studios;
            $scope.loaderror = false;            
        }, function (err){
            $scope.loaderror = true;
        })

        Courses.query(function (courses) {
            $scope.courses = courses;
            $scope.loaderror = false;            
        }, function (err){
            $scope.loaderror = true;
        })

        Instructors.query(function (instructors) {
            $scope.instructors = instructors;
            console.log(instructors);
            $scope.loaderror = false;            
        }, function (err){
            $scope.loaderror = true;
        })
if ($scope.loaderror == false || $scope.loaderror == false||  $scope.adderror == false || 
    $scope.updateerror == false || $scope.delerror == false|| $scope.fileerror == false ){
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
       $scope.loaderror = false;            
        }, function (err){
            $scope.loaderror = true;
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
        $scope.loaderror = false;            
        }, function (err){
            $scope.loaderror = true;
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
        $scope.loaderror = false;            
        }, function (err){
            $scope.loaderror = true;
        });
    };
    }

     $scope.find = function() {
        Students.query(function(students) {
            $scope.students = students;
            sleep(2500); 
            $scope.showuser = true;
            $scope.loaderror = false;            
        }, function (err){
            $scope.showuser = true;
            $scope.loaderror = true;
        });
        Tzs.query(function(tzs) {
            $scope.tzs = tzs; 
            $scope.loaderror = false;            
        }, function (err){
            $scope.loaderror = true;
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
        }, function (err){
            $scope.updateerror = true;
        });
    };

    $scope.remove = function(student) {
        $scope.delerror = true;
        if (student) {
            student.$remove(function(response) {
            $scope.delerror = false; 
            //yana: add check if response valid?
        }, function (err){
            $scope.delerror = true;
        });  
            for (var i in $scope.students) {
                if ($scope.students[i] === student) {
                    $scope.students.splice(i, 1);
                }
            }
        }
        else {
            $scope.student.$remove(function(response) {
            $scope.delerror = false; 
            //yana: add check if response valid?
        }, function (err){
            $scope.delerror = true;
        }
            ); 
            // $state.go('student'); //yana: test
        }
    };

    $scope.removetz =  function (tz) {
        if (tz) {
            tz.$remove(function(response) {
                 $scope.delerror = false; 
            //yana: add check if response valid?
        }, function (err){
            $scope.delerror = true;
        });  
            for (var i in $scope.tzs) {
                if ($scope.tzs[i] === tz) {
                    $scope.tzs.splice(i, 1);
                }
            }
        }
        else {
            $scope.tz.$remove(function(response) {
                 $scope.delerror = false; 
            //yana: add check if response valid?
        }, function (err){
            $scope.delerror = true;
        }); 
        }    
    };

    $scope.removeView = function(student) {
        if (student) {
            student.$remove(function(response) {
            $scope.delerror = false; 
            //yana: add check if response valid?
         $state.go('ViewStud');
        }, function (err){
           $scope.delerror = true;
        }); 
        }
        else {
            $scope.student.$remove(function(response) {
            $scope.delerror = false; 
            $state.go('ViewStud'); //yana: test
            
            //yana: add check if response valid?
        }, function (err){
            $scope.delerror = true;
        });
            // $state.go('ViewStud'); //yana: test
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