angular.module('mean.system').controller('CreateNewAssignmentController', ['$scope', '$resource','Global', '$window','Students',
'Studios','$http','StudentInStudio','Assignments','$stateParams',function 
($scope, $resource,Global,$window,Students,Studios,$http,StudentInStudio,Assignments,$stateParams) {
    console.log("CreateNewAssignmentController");
    $scope.global = Global;
    $scope.status = null;
    $scope.findall = false;
    $scope.findallview = true;
   //hide btn 
    $scope.myBtn = false;
    $scope.loading = true;
    $scope.assign = true;
    $scope.addstudflag = false;
    $scope.assignments = null;
    $scope.missingStatus = false;
    $scope.tooltip = false;
    $scope.alertIsActive = false; 
    $scope.alertEmptyStudio = false;
    $scope.alertEmptyStudents = false;
    $scope.dataError = false;
    $scope.serverError = false;



    
    $scope.studios = [];

    $scope.models = {
        studioLists : {},
        selected: null
    };
    $scope.emptyStudio = function (){
    $scope.studios = [];
}

  $scope.getStudios = function(){
            Studios.query(function(studios){  
            studios.forEach(function(studio) {
                if ($scope.ChosenYear == "3,4" && $scope.ChosenSemester == "winter"){
                    if (studio.RelevantYears == '3,4' && studio.Semester == "winter" && studio.IsActive){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }
                }
                else if($scope.ChosenYear == "5" && $scope.ChosenSemester == "winter"){
                     if (studio.RelevantYears == '5' && studio.Semester == "winter" && studio.IsActive){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }                
                }

                  else if($scope.ChosenYear == "3,4" && $scope.ChosenSemester == "spring"){
                     if (studio.RelevantYears == '3,4' && studio.Semester == "spring" && studio.IsActive){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }                
                }

                   else if($scope.ChosenYear == "5" && $scope.ChosenSemester == "spring"){
                     if (studio.RelevantYears == '5' && studio.Semester == "spring" && studio.IsActive  ){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }                
                }
                else{
                    $scope.models.studioLists = {};
                }
            }, this);

            if ($scope.studios == ""){
                $scope.loading = false;
                $scope.addstudflag = false;
                $scope.alertIsActive = true;
                $scope.alertEmptyStudio = true;
                $scope.findall = false;
                return;
             }
             $scope.findall = false;
             $scope.dataError =false;
        }, function (err){
            $scope.dataError =true;
        });
  };



    $scope.init = function (){
     //check if all drop d is Chosen 
     if($scope.ChosenYear == "choose year.." || $scope.ChosenSemester == "choose semester.." ){
         alert("בחר שנה וסמסטר");
          $scope.myBtn=false
         return;
     }
     else{
            $scope.findall = true;
            $scope.myBtn=true;
     }
        Students.query(function(students) {
            $scope.students = students;
            $scope.models.studioLists[0] = [];
            students.forEach(function(student) {
                if ($scope.ChosenYear == "3,4" && $scope.ChosenSemester == "winter"){
                    if ((student.CurrentYear =='3'|| student.CurrentYear =='4') && student.Semester == "winter"){
                      $http.get('/getstudentpreference/' + student.id ).success(function(preferences){
                            if (preferences){
                                student.preferences = preferences;
                                var prefosh = [];
                                preferences.forEach(function(preferences){
                                     $http.get('/studios/' + preferences.IdS ).success(function(studio){
                                     if (studio){
                                        prefosh.push(studio.Name); 
                                        $scope.serverError = false;
                                    }
                                    }).error(function (studio) {
                                        $scope.status = "There was an error in studio data.";
                                        $scope.serverError = true;
                                    });
                                }, this); 
                                student.preferences = prefosh;
                                $scope.serverError = false;
                                $scope.myBtn = true;
                            }
                        }).error(function (preferences) {
                            $scope.status = "There was an error in preferences data.";
                            $scope.serverError = true;
                            $scope.myBtn = false;
                        });
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else if ($scope.ChosenYear == "3,4" && $scope.ChosenSemester == "spring"){
                    if ((student.CurrentYear =='3'|| student.CurrentYear =='4') && student.Semester == "spring"){
                      $http.get('/getstudentpreference/' + student.id ).success(function(preferences){
                            if (preferences){
                                student.preferences = preferences;
                                var prefosh = [];
                                preferences.forEach(function(preferences){
                                     $http.get('/studios/' + preferences.IdS ).success(function(studio){
                                     if (studio){
                                        prefosh.push(studio.Name); 
                                        $scope.serverError = false;
                                    }
                                    }).error(function (preferences) {
                                        $scope.status = "There was an error in studio data.";
                                        $scope.serverError = true;
                                    });
                                }, this); 
                                student.preferences = prefosh;
                                $scope.serverError = false;
                                $scope.myBtn = true;
                            }
                        }).error(function (preferences) {
                            $scope.status = "There was an error in preferences data.";
                            $scope.serverError = true;
                            $scope.myBtn = false;
                        });
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else if ($scope.ChosenYear == "5" && $scope.ChosenSemester == "winter"){
                    if (student.CurrentYear =='5' && student.Semester == "winter"){
                      $http.get('/getstudentpreference/' + student.id ).success(function(preferences){
                            if (preferences){
                                student.preferences = preferences;
                                var prefosh = [];
                                preferences.forEach(function(preferences){
                                     $http.get('/studios/' + preferences.IdS ).success(function(studio){
                                     if (studio){
                                        prefosh.push(studio.Name); 
                                        $scope.serverError = false;
                                    }
                                    }).error(function (preferences) {
                                        $scope.status = "There was an error in studio data.";
                                        $scope.serverError = true;
                                    });
                                }, this); 
                                student.preferences = prefosh;
                                $scope.serverError = false;
                                $scope.myBtn = true;
                            }
                        }).error(function (preferences) {
                            $scope.status = "There was an error in preferences data.";
                            $scope.serverError = true;
                            $scope.myBtn = false;
                        });
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else if ($scope.ChosenYear == "5" && $scope.ChosenSemester == "spring"){
                    if (student.CurrentYear =='5' && student.Semester == "spring"){
                      $http.get('/getstudentpreference/' + student.id ).success(function(preferences){
                            if (preferences){
                                student.preferences = preferences;
                                var prefosh = [];
                                preferences.forEach(function(preferences){
                                     $http.get('/studios/' + preferences.IdS ).success(function(studio){
                                     if (studio){
                                        prefosh.push(studio.Name); 
                                        $scope.serverError = false;
                                    }
                                    }).error(function (preferences) {
                                        $scope.status = "There was an error in studio data.";
                                        $scope.serverError = true;
                                    });
                                }, this); 
                                student.preferences = prefosh;
                                $scope.serverError = false;
                                $scope.myBtn = true;
                            }
                        }).error(function (preferences) {
                            $scope.status = "There was an error in preferences data.";
                            $scope.serverError = true;
                            $scope.myBtn = false;
                        });
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else{
                    $scope.models.studioLists = {};
                }   
            }, this);
            if($scope.models.studioLists[0] == []){
                
                $scope.loading = false;
                $scope.addstudflag = false;
                $scope.alertEmptyStudents = false;
                $scope.findall = false;
                return;
            }
           $scope.dataError =false; 
            $scope.myBtn = true;
         }, function (err){
            $scope.dataError =true;
            $scope.myBtn = false;
            return;
        });
       
        $scope.getStudios();
        $scope.addstudflag = true;

        //$scope.alertIsActive = true; 
        //$scope.loading = true; 
    };


    $scope.findAssignments = function (){
        Assignments.query(function(assignments) {
            $scope.assignments = assignments;
            $scope.dataError = false; 
     }, function (err){
            $scope.dataError = true;
        });
    };

        $scope.clickforinfo = function (student){
          if($scope.tooltip == false){
             $scope.tooltip = true; 
          } 
          else{
            $scope.tooltip = false; 
          } 
    }


    $scope.ChosenYear = "choose year..";
    $scope.ChosenSemester = "choose semester..";

    $scope.$watch('models.studioLists', function (model) {
         var count = 0;
            var Male = 0;
            var female = 0;
            var GAverage = 0;
            var SAverage = 0;
         $scope.studios.forEach(function(studio) {
            count = 0;
            Male = 0;
            female = 0;
            GAverage = 0;
            SAverage = 0;
         $scope.models.studioLists[studio.id] .forEach(function(student){
            if(student.id != undefined){
                count +=1;
                GAverage += student.Generalaverage;
                SAverage += student.LastStudioGrade;
                if(student.Gender == 'female')
                {
                    female +=1;
                }  
                else{
                    Male+=1;
                } 
            }
            }, this);
            if(count != 0){
            studio.GAverage = GAverage/count;
            studio.SAverage = SAverage/count;
            studio.female = parseInt((female/count)*100);
            studio.male = parseInt((Male/count)*100);
            studio.count = count;
            }
            else{
            studio.GAverage = "";
            studio.SAverage = "";
            studio.female = "";
            studio.male = ""; 
            studio.count = ""; 
            }
           
        }, this);
    }, true);

    $scope.changePrefrence =  function(moved_student,studio) {
        $scope.studios.forEach(function(studio) {
            $scope.models.studioLists[studio.id] .forEach(function(student){
                if(student.id == moved_student.id){
                    $http.get('/getstudentpreference/' + student.id + '/' + studio.id).success(function(preference){
                        if (preference){
                            student.Preference = preference.Rate;
                        }
                        $scope.serverError = false;
                        $scope.myBtn = true;
                    }).error(function (preference) {
                            $scope.status = "There was an error in preferences data.";
                            $scope.serverError = true;
                             $scope.myBtn = false;
                            
                        });                 
                }
            }, this);
           
        }, this);       
    }

    $scope.runAlgo = function(){
        $scope.loading = false;
        if ($scope.ChosenYear == "5"){
            $scope.algoYear = "5";
        }
        else{
            $scope.algoYear = "3";
        }
        $http.get('/createNewAssigment/' + $scope.algoYear + "/" + $scope.ChosenSemester).success(function(respData){ 
            $scope.status = "Algorithem run finished succesfully.";
            //empty student list
            $scope.models.studioLists[0] = [];
            //set each studio and students in studio
            respData[0].forEach(function(studio) {
                if (studio.hasOwnProperty('id_list')){
                    studio.id_list.forEach(function(student) {
                            $scope.students.forEach(function(obj) {
                            if (obj.id == student[0]){
                                    obj.Preference = student[1];
                                    $scope.models.studioLists[studio.studio].unshift(obj); 
                            } 
                            }, this);
                    }, this)
                }
                if (studio.hasOwnProperty('no_preferences')){
                    studio.no_preferences.forEach(function(student) {
                            $scope.students.forEach(function(obj) {
                            if (obj.id == student){
                                    //obj.Preference = student[1];
                                    $scope.models.studioLists[0].unshift(obj); 
                            } 
                            }, this);
                    }, this)
                }                
                else{
                }
                studio.GAverage = studio.general_average;
                studio.SAverage = studio.studio_average;
                studio.female = ((studio.female/studio.total_in_studio)*100);
                studio.male = ((studio.male/studio.total_in_studio)*100);
                studio.count = studio.total_in_studio;
            }, this);
            $scope.loading = true;
            $scope.serverError = false;
        }).error(function (respData) {
               $scope.status = "There was an error while running the algorithem.";
               $scope.loading = true;
               $scope.serverError = true;
        });
    }


    $scope.SaveAssinment = function(){
        $http.get('/getregistration').success(function(respData){
            var assignment = new Assignments({
                Year: $scope.ChosenYear,
                Semester: $scope.ChosenSemester,
                IdR: respData.id
            })
            assignment.$save(function(response){
                var ass = response;
                    $scope.studios.forEach(function(studio) {
                        $scope.models.studioLists[studio.id].forEach(function(student) {
                                if (student.length != 0){
                                var studentinstudio = new StudentInStudio({
                                    IdStudent:student.id,
                                    Studio:studio.id,
                                    Instructor:studio.Instructor,
                                    AId: ass.id,
                                    IdR:  respData.id
                                })
                                studentinstudio.$save(function(response) {
                                    $scope.dataError =false;
                                    $scope.myBtn =true;
                                }, function (err){
                                    $scope.dataError =true;
                                    $scope.myBtn =false;
                                    return;
                                });
                                }
                            }, this);
                    }, this); 
                    $scope.assign = false;
                    $scope.dataError =false;
                    $scope.myBtn =true;
            }, function (err){
                $scope.dataError =true;
                $scope.myBtn =false;
            });
        }, function (err){
                $scope.dataError =true;
                $scope.myBtn =false;
        });
    };

    $scope.AddStudent= function(){
        $scope.missingStatus = false;
        Students.get({
            studentId:$scope.MissingStudent
        },function(student){
            $scope.models.studioLists[0].forEach(function(obj) {
                if (student.id == obj.id){
                    $scope.missingStatus = true;
                }
            }, this);
            $scope.studios.forEach(function(studio) {
                $scope.models.studioLists[studio.id].forEach(function(obj) {
                    if (student.id == obj.id){
                        $scope.missingStatus = true;
                    }
                }, this);
            }, this);
            if(!$scope.missingStatus){
                $scope.models.studioLists[0].push(student);
            }
        })
        $scope.MissingStudent = "";
    }

    //this is the edit section


    $scope.Load = function(typ){

        $scope.emptyStudio();
        $scope.models.studioLists[0] = [];
        Assignments.get({
            assignmentId: $stateParams.assignmentId
        }, function(assignment) {
            $scope.ChosenYear = assignment.Year;
            $scope.ChosenSemester = assignment.Semester;
            $scope.registration = assignment.IdR;
            $scope.getStudios();
        });
        $http.get('/getstudentinstudio/' + $stateParams.assignmentId).success(function(respData){           
            respData.forEach(function(studentinstudio) {
                Students.get({
                    studentId: studentinstudio.IdStudent
                }, function(student) {
                $http.get('/getstudentpreference/' + studentinstudio.IdStudent + '/' + studentinstudio.Studio + '/' + $scope.registration).success(function(preference){
                    if (preference){
                        student.Preference = preference.Rate;
                       $http.get('/getstudentpreference/' + student.id ).success(function(preferences){
                            if (preferences){
                                student.preferences = preferences;
                                var prefosh = [];
                                if(typ == 'edit'){
                                    preferences.forEach(function(preferences){
                                        $http.get('/studios/' + preferences.IdS ).success(function(studio){
                                        if (studio){
                                            prefosh.push(studio.Name); 
                                        }
                                          $scope.serverError = false;
                                        }).error(function (studio) {
                                                $scope.status = "There was an error in preferences data.";
                                                $scope.serverError = true;
                                                $scope.findallview = false; 
                                             });
                                    }, this); 
                                    student.preferences = prefosh;
                                 }
                            }
                             $scope.serverError = false;
                             $scope.myBtn = true; 
                        }).error(function (preferences) {
                             $scope.status = "There was an error in preferences data.";
                             $scope.serverError = true;
                             $scope.myBtn = false;
                            
                        });

                        $scope.models.studioLists[studentinstudio.Studio].unshift(student);
                      $scope.findallview = false;   
                    }
                     $scope.serverError = false;
                }).error(function (preference) {
                             $scope.status = "There was an error in student data.";
                             $scope.serverError = true;
                             $scope.findallview = false; 
                            
                        });
  
              });   
            }, this); 
                     $scope.serverError = false;
        }).error(function (respData) {
                             $scope.status = "There was an error in preferences data.";
                             $scope.serverError = true;
                             $scope.findallview = false; 
                            
                        });
        $scope.loading = false;
    }

    $scope.UpdateAssinment = function(){
        $scope.studios.forEach(function(studio) {
            $scope.models.studioLists[studio.id].forEach(function(student) {
                    if (student.length != 0){
                        $http.get('/getstudentinstudio/' + $stateParams.assignmentId + "/" + student.id).success(function(respData){
                            if (respData.length){
                                var studentinstudio = new StudentInStudio({
                                    IdStudent: respData[0].IdStudent,
                                    Studio: respData.Studio,
                                    Instructor: respData.Instructor,
                                    AId: respData[0].AId
                                });
                                studentinstudio.Instructor = studio.Instructor;
                                studentinstudio.Studio = studio.id;
                                if (!studentinstudio.updated) {
                                    studentinstudio.updated = [];
                                }
                                studentinstudio.updated.push(new Date().getTime());
                                    studentinstudio.$update(function() {
                                         $scope.serverError =false;
                               }, function (err){
                                            $scope.serverError =true;
                                        });
                            }
                            else{
                                var studentinstudio = new StudentInStudio({
                                    IdStudent: student.id,
                                    Studio: studio.id,
                                    Instructor: studio.Instructor,
                                    AId: $stateParams.assignmentId
                                });
                                studentinstudio.$save(function(response) {
                                     $scope.serverError =false;
                                  }, function (err){
                                            $scope.serverError =true;
                                        });
                            }
                            $scope.dataError = false;
                        }).error(function (respData) {
                            $scope.status = "There was an error in student data.";
                            $scope.dataError = true;
                        });
                    }
                }, this);
        }, this);    
       $scope.assign = false;        
}
     $scope.checkIfActive = function(){
        $http.get('/getregistration/').success(function(reg){
            if (reg.IsActive){
                 $scope.loading = false;
                 $scope.alertIsActive = true;
                 $scope.serverError = false;  
                 
                 return;
            }
        }).error(function (reg) {
                $scope.status = "There was an error in registration data.";
                $scope.serverError = true;
             });
    }
}]);

