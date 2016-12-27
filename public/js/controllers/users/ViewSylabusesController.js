angular.module('mean.system').controller('ViewSylabusesController', ['$scope', '$resource' ,'Global', 'Studios','$window','Instructors',
function ($scope, $resource ,Global ,Studios ,$window, Instructors) {
    console.log("ViewSylabusesController");
    $scope.global = Global;
    $scope.showsylab = false;
    $scope.loaderror = null;
    $scope.adderror = null;    

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
            break;
            }
        }
    }

     $scope.find = function() {
        Studios.query(function(studios) {
        $scope.studios = studios; //yana: add error
            sleep(1000);
            $scope.studios.forEach(function(studio) {
                Instructors.query(function(instructors){
                    $scope.instructors = instructors;
                    $scope.instructors.forEach(function(instructor) {
                        if(instructor.id == studio.Instructor){
                                studio.Instructor = instructor.FirstName + " " + instructor.LastName;
                        }                  
                    }, this); 
                })
            }, this);
            //sleep(1500);
            $scope.showsylab = true;
            $scope.loaderror = false;
        } ,function (err){
            $scope.showsylab = true;
            $scope.loaderror = true;
        }
     );
    };

    $scope.openPdf = function(link){
        $window.open('uploads/' +link);
    }


    $scope.find();
}]);