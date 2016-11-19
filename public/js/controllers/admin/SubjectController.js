angular.module('mean.system').controller('SubjectController', ['$scope', '$resource' ,'Global', 'SubjectMap','$window',function ($scope, $resource ,Global ,SubjectMap ,$window) {
    console.log("SubjectController");
    $scope.global = Global;
    $scope.showsubj = false;    

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
            break;
            }
        }
    }

    $scope.addSubject = function() {
        var subjects = new SubjectMap({
            Subject: $scope.subjectname
        });
        subjects.$save(function(response) {
            $scope.find();
        });
        $scope.clear();
    };

     $scope.find = function() {
        SubjectMap.query(function(subjects) {
            $scope.subjects = subjects;
            sleep(1500);
            $scope.showsubj = true;
        });
    };


    $scope.clear = function(){
        $scope.id = null;
        $scope.Subject = null;
    };

    $scope.find();

}]);