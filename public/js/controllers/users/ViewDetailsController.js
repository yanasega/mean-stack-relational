angular.module('mean.system').controller('ViewDetailsController', ['$scope', '$resource', 'Registrations','Preferences' ,'Global', '$window','Students','Studios',
'StudentInStudio','Instructors',function ($scope, $resource , Registrations,Preferences,Global,$window,Students,Studios,StudentInStudio,Instructors) {
    $scope.global = Global;

    console.log("ViewDetailsController");
    $scope.years = {"3": 3, "4":4, "5":5};
    $scope.doneInsert = false;

    $scope.findOne = function() {
        Students.get({
            studentId: $scope.global.user.id
        }, function(student) {
            $scope.student = student;
            console.log(student.CurrentYear);
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