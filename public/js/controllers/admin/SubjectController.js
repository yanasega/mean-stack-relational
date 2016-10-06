angular.module('mean.system').controller('SubjectController', ['$scope', '$resource' ,'Global', 'SubjectMap','$window',function ($scope, $resource ,Global ,SubjectMap ,$window) {
    console.log("SubjectController");
    $scope.global = Global;
    $scope.showsubj = true;    

    $scope.addSubject = function() {
        var subjects = new SubjectMap({
            Subject: $scope.subjectname
        });
        subjects.$save(function(response) {
            $scope.find();
            //yana: add check if response valid?
        });
        $scope.clear();
    };

     $scope.find = function() {
        SubjectMap.query(function(subjects) {
            $scope.subjects = subjects; //yana: check if data relavent?
            $scope.showsubj = true;
        });
    };


    $scope.clear = function(){
        // $scope.id = null;
        $scope.firstname = null;
        $scope.lastname = null;
    };


    $scope.find();
}]);