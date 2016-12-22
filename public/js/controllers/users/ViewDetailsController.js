angular.module('mean.system').controller('ViewDetailsController', ['$scope', '$resource', 'Registrations','Preferences' ,'Global', '$window','Students','Studios',
'StudentInStudio','Instructors',function ($scope, $resource , Registrations,Preferences,Global,$window,Students,Studios,StudentInStudio,Instructors) {
    $scope.global = Global;
    $scope.showdet = false;
    console.log("ViewDetailsController");
    $scope.years = {"3": 3, "4":4, "5":5};
    $scope.doneInsert = false;

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    $scope.findOne = function() {
        Students.get({
            studentId: $scope.global.user.id
        }, function(student) {
            $scope.student = student;
        });
    };

    $scope.updateStudent = function(){      
        //update student
        var student = $scope.student;
        // student.Generalaverage = $scope.average;
        // student.LastStudioGrade = $scope.studioaverage;
        // student.CurrentYear = $scope.currentyear;
        // student.Semester = $scope.semester;

        if (!student.updated) {
            student.updated = [];
        }
        student.updated.push(new Date().getTime());
        student.$update(function() {
            $scope.doneInsert = true;
        });
    }

}]);