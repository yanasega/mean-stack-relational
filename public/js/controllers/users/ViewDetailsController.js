angular.module('mean.system').controller('ViewDetailsController', ['$scope', '$resource', 'Registrations','Preferences' ,'Global', '$window','Students','Studios',
'StudentInStudio','Instructors',function ($scope, $resource , Registrations,Preferences,Global,$window,Students,Studios,StudentInStudio,Instructors) {
    $scope.global = Global;
    $scope.showdet = false;
    console.log("ViewDetailsController");
    $scope.years = {"3": 3, "4":4, "5":5};
    $scope.updateerror = false;
    $scope.loaderror = false;
    $scope.doneinsert = false;

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
        }, function (err) {
            $scope.loaderror = true;
        });
    };

    $scope.updateStudent = function(){      
        var student = $scope.student;

        if (!student.updated) {
            student.updated = [];
        }
        student.updated.push(new Date().getTime());
        student.$update(function() {
            $scope.doneinsert = true;
            
            
        }, function (err) {
            $scope.updateerror = true;
        });
    }

}]);