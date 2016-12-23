angular.module('mean.system').controller('CourseController', ['$scope', '$resource' ,'Global', 'Courses','$window','$stateParams','$state'
,function ($scope, $resource ,Global ,Courses ,$window,$stateParams,$state) {
    console.log("CourseController");
    $scope.global = Global;
    $scope.showcourse = false;    
    $scope.loaderror = null;
    $scope.adderror = null; 
    $scope.updateerror = null;
    $scope.delerror = null; 

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    $scope.addCourse = function() {
        var course = new Courses({

			Id: $scope.id,
            Name: $scope.name,
			CreditPoints: $scope.creditpoints,
            CourseType: $scope.coursetype
        });
        course.$save(function(response) {
            $scope.find();
            $scope.adderror = false;        
        }, function (err){
            $scope.adderror = true;
        });        
        $scope.clear();
    };

     $scope.find = function() {
        Courses.query(function(courses) {
            $scope.courses = courses; 
            sleep(2000);
            $scope.showcourse = true;
            $scope.loaderror = false;            
        }, function (err){
            $scope.loaderror = true;
        });
    };

    $scope.findOne = function() {
        Courses.get({
            courseId: $stateParams.courseId
        }, function(course) {
            $scope.course = course;
            $scope.loaderror = false;            
        }, function (err){
            $scope.loaderror = true;
        });
    };

    $scope.update = function() {
        var course = $scope.course;
        if (!course.updated) {
            course.updated = [];
        }
        course.updated.push(new Date().getTime());
        course.$update(function() {
            $state.go('ViewCourse');
        }, function (err){
            $scope.updateerror = true;
        });
    };

    $scope.remove = function(course) {
        if (course) {
            course.$remove(function(response) {
                 $scope.delerror = false; 
            //yana: add check if response valid?
        }, function (err){
            $scope.delerror = true;
        }
            );  
            

            for (var i in $scope.courses) {
                if ($scope.courses[i] === course) {
                    $scope.courses.splice(i, 1);
                }
            }           
        }
        else {
            $scope.course.$remove(function(response) {
                 $scope.delerror = false; 
            //yana: add check if response valid?
        }, function (err){
            $scope.delerror = true;
        }
            ); 
            //$state.go('courses'); //yana: test
        }
        $scope.clear();
    };

    $scope.clear = function(){
        $scope.id = null;
        $scope.name = null;
        $scope.creditpoints = null;
        $scope.coursetype ="";
    };
 

    $scope.find();
}]);