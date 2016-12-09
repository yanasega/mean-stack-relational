angular.module('mean.system').controller('CreateNewAssignmentController', ['$scope', '$resource','Global', '$window','Students',
'Studios','$http','StudentInStudio','Assignments','$stateParams',function 
($scope, $resource,Global,$window,Students,Studios,$http,StudentInStudio,Assignments,$stateParams) {
    console.log("CreateNewAssignmentController");
    $scope.global = Global;
    $scope.status = null;
   //hide btn 
    $scope.myBtn = false;
    $scope.loading = true;
    $scope.assign = true;
    $scope.addstudflag = false;
    $scope.assignments = null;
    $scope.missingStatus = false;
    $scope.tooltip = false;
    $scope.alertIsActive = false;   


    $scope.studios = [];


    $scope.models = {
        studioLists : {},
        selected: null
    };
    $scope.emptyStudio = function (){
    $scope.studios = [];
}

   function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

  $scope.getStudios = function(){
             Studios.query(function(studios){
            studios.forEach(function(studio) {
                if ($scope.ChosenYear == "3,4" && $scope.ChosenSemester == "winter"){
                    if (studio.RelevantYears == '3,4' && studio.Semester == "winter"){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }
                }
                else if($scope.ChosenYear == "5" && $scope.ChosenSemester == "winter"){
                     if (studio.RelevantYears == '5' && studio.Semester == "winter"){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }                
                }

                  else if($scope.ChosenYear == "3,4" && $scope.ChosenSemester == "spring"){
                     if (studio.RelevantYears == '3,4' && studio.Semester == "spring"){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }                
                }

                   else if($scope.ChosenYear == "5" && $scope.ChosenSemester == "spring"){
                     if (studio.RelevantYears == '5' && studio.Semester == "spring"){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }                
                }
                else{
                    $scope.models.studioLists = {};
                }
            }, this);
        });
    }


    $scope.init = function (){
     //check if all drop d is Chosen 
     if($scope.ChosenYear == "choose year.." || $scope.ChosenSemester == "choose semester.." ){
         alert("בחר שנה וסמסטר");
         return;
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
                            }
                        })
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else if ($scope.ChosenYear == "3,4" && $scope.ChosenSemester == "spring"){
                    if ((student.CurrentYear =='3'|| student.CurrentYear =='4') && student.Semester == "spring"){
                        $http.get('/getstudentpreference/' + student.id ).success(function(preferences){
                            if (preferences){
                                student.preferences = preferences;
                            }
                        })
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else if ($scope.ChosenYear == "5" && $scope.ChosenSemester == "winter"){
                    if (student.CurrentYear =='5' && student.Semester == "winter"){
                        $http.get('/getstudentpreference/' + student.id ).success(function(preferences){
                            if (preferences){
                                student.preferences = preferences;
                            }
                        })
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else if ($scope.ChosenYear == "5" && $scope.ChosenSemester == "spring"){
                    if (student.CurrentYear =='5' && student.Semester == "spring"){
                        $http.get('/getstudentpreference/' + student.id ).success(function(preferences){
                            if (preferences){
                                student.preferences = preferences;
                            }
                        })
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else{
                    $scope.models.studioLists = {};
                }   
            }, this);
        });

        $scope.getStudios();
        $scope.addstudflag = true;
    }


    $scope.findAssignments = function (){
        Assignments.query(function(assignments) {
            $scope.assignments = assignments; 
        });
    }

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
                    })                 
                }
            }, this);
           
        }, this);       
    }

    $scope.runAlgo = function(){
        $scope.loading = false;
        $scope.addstudflag = false;
        if ($scope.ChosenYear == "5"){
            $scope.algoYear = "5";
        }
        else{
            $scope.algoYear = "3";
        }
        $http.get('/createNewAssigment/' + $scope.algoYear + "/" + $scope.ChosenSemester).success(function(respData){ //yana: do I need to set the config.server????
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
                else{
                    console.log(studio);
                }
                studio.GAverage = studio.general_average;
                studio.SAverage = studio.studio_average;
                studio.female = ((studio.female/studio.total_in_studio)*100);
                studio.male = ((studio.male/studio.total_in_studio)*100);
                studio.count = studio.total_in_studio;
            }, this);
            $scope.loading = true;
            $scope.addstudflag = true;
        }).error(function (respData) {
               $scope.status = "There was an error while running the algorithem.";
               $scope.loading = true;
               $scope.addstudflag = true;
        });
    }


    $scope.SaveAssinment = function(){
        var assignment = new Assignments({
            Year: $scope.ChosenYear,
            Semester: $scope.ChosenSemester
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
                            AId: ass.id
                            
                        })
                        studentinstudio.$save(function(response) {
                            console.log('success');
                        });
                        }
                    }, this);
            }, this); 
            $scope.assign = false;
        });
    }

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
    $scope.Load = function(){
        $scope.loading = false;
        sleep(1500);
        $scope.emptyStudio();
        $scope.models.studioLists[0] = [];
        Assignments.get({
            assignmentId: $stateParams.assignmentId
        }, function(assignment) {
            $scope.ChosenYear = assignment.Year;
            $scope.ChosenSemester = assignment.Semester;
        });
        $scope.getStudios();
        $http.get('/getstudentinstudio/' + $stateParams.assignmentId).success(function(respData){
            respData.forEach(function(studentinstudio) {
                Students.get({
                    studentId: studentinstudio.IdStudent
                }, function(student) {
                $http.get('/getstudentpreference/' + studentinstudio.IdStudent + '/' + studentinstudio.Studio).success(function(preference){
                    console.log("got");
                    if (preference){
                        student.preference = preference.Rate;
                        $scope.models.studioLists[studentinstudio.Studio].unshift(student);
                    }
                })
              });   
            $scope.loading = true;  
            }, this); 
        })
        
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
                                        console.log("success");
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
                                    console.log('success');
                                });
                            }
                        })
                    }
                }, this);
        }, this);    
               
    }
    $scope.checkIfActive = function(){
        $http.get('/getregistration/').success(function(reg){
            if (reg.IsActive){
                 $scope.loading = false;
                 $scope.alertIsActive = true;  
                 
                 return;
            }
        })
    }


}]);


