angular.module('mean.system').controller('CreateNewAssignmentController', ['$scope', '$resource','Global', '$window','Students',
'Studios','$http',function ($scope, $resource,Global,$window,Students,Studios,$http) {
    console.log("CreateNewAssignmentController");
    $scope.global = Global;
    $scope.showreg = false;
    $scope.count34 = 0;
    $scope.count5 = 0;
    $scope.status = null;

    // $scope.Sdata = {
    //    count = 0,
    //     Male = 0,
    //     female= 0,
    //     GAvarage= 0,
    //     SAvarage= 0
    // };

    $scope.studios = [];


    $scope.models = {
        studioLists : {},
        selected: null
    };

    $scope.init = function (){
     //check if all drop d is Chosen 
     if($scope.ChosenYear == "choose year.." || $scope.ChosenSemester == "choose Semester .." ){
         alert("please choose relevant year and Semester");
         return;
     }
        Students.query(function(students) {
            $scope.models.studioLists[0] = [];
            students.forEach(function(student) {
                if ($scope.ChosenYear == "3rd-4th" && $scope.ChosenSemester == "winter"){
                    console.log(34);
                    if ((student.CurrentYear =='3'|| student.CurrentYear =='4') && student.Semester == "winter"){
                        $scope.models.studioLists[0].push(student);
                        console.log(student);
                    }
                }
                else if ($scope.ChosenYear == "3rd-4th" && $scope.ChosenSemester == "spring"){
                    if ((student.CurrentYear =='3'|| student.CurrentYear =='4') && student.Semester == "spring"){
                        $scope.models.studioLists[0].push(student);
                        console.log(student)
                    }
                }
                else if ($scope.ChosenYear == "5th" && $scope.ChosenSemester == "winter"){
                    console.log(5);
                    if (student.CurrentYear =='5' && student.Semester == "winter"){
                        $scope.models.studioLists[0].push(student);
                        console.log(student)
                    }
                }
                else if ($scope.ChosenYear == "5th" && $scope.ChosenSemester == "spring"){
                 console.log(5);
                    if (student.CurrentYear =='5' && student.Semester == "spring"){
                    $scope.models.studioLists[0].push(student);
                    console.log(student)
                }
              }
                else{
                    $scope.models.studioLists = {};
                }
            }, this);
        });

        Studios.query(function(studios){
            studios.forEach(function(studio) {
                if ($scope.ChosenYear == "3rd-4th" && $scope.ChosenSemester == "winter"){
                    if (studio.RelevantYears == '3,4' && studio.Semester == "winter"){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }
                }
                else if($scope.ChosenYear == "5th" && $scope.ChosenSemester == "winter"){
                     if (studio.RelevantYears == '5' && studio.Semester == "winter"){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }                
                }

                  else if($scope.ChosenYear == "3rd-4th" && $scope.ChosenSemester == "spring"){
                     if (studio.RelevantYears == '3,4' && studio.Semester == "spring"){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }                
                }

                   else if($scope.ChosenYear == "5th" && $scope.ChosenSemester == "spring"){
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




   //default value for drop down list
    $scope.year = ["choose year..","3rd-4th", "5th"];
    $scope.ChosenYear = "choose year..";
    $scope.ChosenSemester = "choose Semester ..";


    // Generate initial model
    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);



    $scope.UpdateStudentsData = function(){
        console.log("hi");
        studioLists.forEach(function(studio) {
            studio.forEach(function(student) {
                $scope.count +=1;
                $scope.GAvarage += student.GeneralAvarage;
                $scope.SAvarage += student.LastStudioGrade;
            if(student.Gender == 'female')
            {
                    $scope.female +=1;
            }  
                else{
                    $scope.Male+=1;
                }
                
            }, this);
            $scope.GAvarage = $scope.GAvarage/$scope.count;
            $scope.SAvarage = $scope.SAvarage/$scope.count;
            $scope.female = $scope.female/$scope.count;
            $scope.Male = $scope.male/$scope.count;
        }, this);

    }

    $scope.runAlgo = function(){
        if ($scope.ChosenYear == "5th"){
            $scope.algoYear = "5";
        }
        else{
            $scope.algoYear = "3";
        }
        $http.get('/createNewAssigment/' + $scope.algoYear + "/" + $scope.ChosenSemester).success(function(respData){ //yana: do I need to set the config.server????
            console.log(respData[0]);
            $scope.status = "Algorithem run finished succesfully.";
        }).error(function () {
               $scope.status = "There was an error while running the algorithem.";
        });
    }
    

}]);


