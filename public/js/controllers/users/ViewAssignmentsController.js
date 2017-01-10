angular.module('mean.system').controller('ViewAssignmentsController', ['$scope', '$resource' ,'Global','Students','Studios',
'StudentInStudio','Instructors','$http',function ($scope, $resource ,Global,Students,Studios,StudentInStudio,Instructors,$http) {
    $scope.global = Global;

    console.log("ViewAssignmentsController");
    $scope.studentinstudio = [];
    $scope.loaderror = false;
    $scope.showass = false;
    
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    $scope.find = function() {
        $http.get('/getmyassigments/' + $scope.global.user.id).success(function(respData){         
            respData.forEach(function(sis) {
                Students.get({
                    studentId: $scope.global.user.id
                }, function(student) {
                    $scope.student = student;
                }, function (err) {
                    $scope.loaderror = true;
                })
                    Studios.get({
                        studioId: sis.Studio
                    }, function(studio) {
                        Instructors.get({
                            instructorId: sis.Instructor
                        }, function(instructor) {
                            sis.Instructor = instructor.FirstName + ' ' + instructor.LastName;
                            sis.Studio = studio.Name;
                        }, function (err){
                            $scope.loaderror = true;
                            $scope.showass = true;
                        });
                    }, function (err){
                        $scope.loaderror = true;
                        $scope.showass = true;
                    });
            }, this);
            $scope.studentinstudio = respData;
            $scope.showass = true;
            
        }).error(function(err){
            $scope.loaderror = true;
            $scope.showass = true;
        })

    };

    $scope.find();
}]);