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
            //$scope.studentinstudio = respData;
            
            respData.forEach(function(sis) {
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




        // StudentInStudio.query(function(studentinstudio) {
        //      studentinstudio.forEach(function(sis) {
        //         if (sis.IdStudent == $scope.global.user.id){
        //             $scope.studentinstudio.push(sis); //yana: check if data relavent?
        //         }    
        //     }, this);
        // })

        // Studios.query(function (studios) {
        //     $scope.studios = studios;
        //     $scope.studentinstudio.forEach(function(sis) {
        //         $scope.studios.forEach(function(studio) {
        //             if(studio.id == sis.Studio){
        //                 sis.Studio = studio.Name;
        //             }
        //         }, this);
        //     }, this);           
        // });
            
        // Instructors.query(function (instructors) {
        //     $scope.instructors = instructors;
        //     $scope.studentinstudio.forEach(function(sis) {
        //         $scope.instructors.forEach(function(instructor) {
        //             if(instructor.id == sis.Instructor){
        //                 sis.Instructor = instructor.FirstName + " " + instructor.LastName ;
        //             }
        //         }, this);
        //     }, this);   
        //     sleep(500);
        //     $scope.showass = true;         
        // }); 


    };

    $scope.find();
}]);