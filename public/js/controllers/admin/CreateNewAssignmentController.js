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
    $scope.assignments = null;


    $scope.studios = [];


    $scope.models = {
        studioLists : {},
        selected: null
    };
    $scope.emptyStudio = function (){
    $scope.studios = [];
}
    $scope.init = function (){
     //check if all drop d is Chosen 
     if($scope.ChosenYear == "choose year.." || $scope.ChosenSemester == "choose Semester .." ){
         alert("please choose relevant year and Semester");
         return;
     }
        Students.query(function(students) {
           
            $scope.students = students;
            $scope.models.studioLists[0] = [];
            students.forEach(function(student) {
                if ($scope.ChosenYear == "3,4" && $scope.ChosenSemester == "winter"){
                    if ((student.CurrentYear =='3'|| student.CurrentYear =='4') && student.Semester == "winter"){
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else if ($scope.ChosenYear == "3,4" && $scope.ChosenSemester == "spring"){
                    if ((student.CurrentYear =='3'|| student.CurrentYear =='4') && student.Semester == "spring"){
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else if ($scope.ChosenYear == "5" && $scope.ChosenSemester == "winter"){
                    if (student.CurrentYear =='5' && student.Semester == "winter"){
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else if ($scope.ChosenYear == "5" && $scope.ChosenSemester == "spring"){
                    if (student.CurrentYear =='5' && student.Semester == "spring"){
                    $scope.models.studioLists[0].push(student);
                }
              }
                else{
                    $scope.models.studioLists = {};
                }
            }, this);
        });

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

    $scope.findAssignments = function (){
        Assignments.query(function(assignments) {
            $scope.assignments = assignments; 
        });
    }
   //default value for drop down list
    $scope.year = ["choose year..","3,4", "5"];
    $scope.ChosenYear = "choose year..";
    $scope.ChosenSemester = "choose Semester ..";


    // Generate initial model
    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

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
            }
            else{
            studio.GAverage = "";
            studio.SAverage = "";
            studio.female = "";
            studio.male = "";  
            }
           
        }, this);
    }, true);


    $scope.runAlgo = function(){
        $scope.loading = false;
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
                studio.id_list.forEach(function(student) {
                    $scope.students.forEach(function(obj) {
                       if (obj.id == student[0]){
                        $scope.models.studioLists[studio.studio].unshift(obj); 
                       } 
                    }, this);
                }, this)
                studio.GAverage = studio.general_average;
                studio.SAverage = studio.studio_average;
                studio.female = (studio.female/studio.total_in_studio)*100;
                studio.male = (studio.male/studio.total_in_studio)*100;
            }, this);
            $scope.loading = true;
        }).error(function (respData) {
               $scope.status = "There was an error while running the algorithem.";
               $scope.loading = true;
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

    //this is th edit section
    $scope.Load = function(){
        $scope.loading = false;
        Assignments.get({
            assignmentId: $stateParams.assignmentId
        }, function(assignment) {
            $scope.ChosenYear = assignment.Year;
            $scope.ChosenSemester = assignment.Semester;
        });
        StudentInStudio.get({
            
        })


        $scope.loading = true;
    }
    //this is the view section
}]);


