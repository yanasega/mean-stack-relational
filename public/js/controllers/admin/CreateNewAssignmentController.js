angular.module('mean.system').controller('CreateNewAssignmentController', ['$scope', '$resource','Global', '$window','Students',
'Studios','$http',function ($scope, $resource,Global,$window,Students,Studios,$http) {
    console.log("CreateNewAssignmentController");
    $scope.global = Global;
    $scope.showreg = false;
    $scope.count34 = 0;
    $scope.count5 = 0;
    $scope.status = null;
    $scope.studios = [];


    $scope.models = {
        studioLists : {},
        selected: null
    };

    $scope.init = function (){
        Students.query(function(students) {
            $scope.models.studioLists[0] = [];
            students.forEach(function(student) {
                if ($scope.ChosenYear == "3rd-4th"){
                    if (student.CurrentYear =='3'|| student.CurrentYear =='4'){
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else if ($scope.ChosenYear == "5th"){
                    if (student.CurrentYear =='5'){
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
                if ($scope.ChosenYear == "3rd-4th"){
                    if (studio.RelevantYears == '3,4'){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }
                }
                else if($scope.ChosenYear == "5th"){
                     if (studio.RelevantYears == '5'){
                        $scope.models.studioLists[studio.id] = [];
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


