angular.module('mean.system').controller('InsertPreferencesController', ['$scope', '$resource', 'Registrations' ,'Global', '$window','Students','Studios',function ($scope, $resource , Registrations,Global,$window,Students,Studios) {
    console.log("InsertPreferencesController");
    $scope.global = Global;
    $scope.RegOpen = false;
    $scope.doneUpdate = false;
    $scope.NotValid = false;
    $scope.studios = [];

    $scope.checkReg = function(){
        Registrations.query(function(registrations) {
            registrations.forEach(function(registration) {
                if (registration.IsActive == true){
                    $scope.RegOpen = true;
                }
            }, this);
        });
    }

    $scope.findOne = function() {
        Students.get({
            studentId: $scope.global.user.id
        }, function(student) {
            $scope.student = student;
        });
    };

    $scope.getStudios = function(){
        Studios.query(function(studios) {
            // $scope.studios = studios;
            if ($scope.student.CurrentYear == '5'){
                studios.forEach(function(studio) {
                    if(studio.RelevantYears === '5' && studio.Semester == $scope.student.Semester){
                        $scope.studios.push(studio);
                    }
                }, this);
            }
            else{
                studios.forEach(function(studio) {
                    if(studio.RelevantYears == '3,4'&& studio.Semester == $scope.student.Semester){
                        $scope.studios.push(studio);
                    }                  
                }, this);
            }
            console.log($scope.studios);
        });
    }

    $scope.updateStudent = function(){      
        //update student
        var student = $scope.student;
        student.Generalaverage = $scope.average;
        student.LastStudioGrade = $scope.studioaverage;
        student.CurrentYear = $scope.currentyear;
        student.Semester = $scope.semester;

        if (!student.updated) {
            student.updated = [];
        }
        student.updated.push(new Date().getTime());
        student.$update(function() {
            if (student.IsValid == false && student.CurrentYear == '5'){
                $scope.NotValid = true;
            }
            $scope.getStudios();
            $scope.doneUpdate = true;
        });
    }

    $scope.insertPreferences = function(){

    }

    $scope.checkReg();
    $scope.findOne();
}]);


