angular.module('mean.system').controller('ViewAssignmentsController', ['$scope', '$resource', 'Registrations','Preferences' ,'Global', '$window','Students','Studios',
'StudentInStudio','Instructors',function ($scope, $resource , Registrations,Preferences,Global,$window,Students,Studios,StudentInStudio,Instructors) {
    $scope.global = Global;

    console.log("ViewAssignmentsController");
    $scope.studentinstudio = [];
    $scope.preferences = [];
    
    $scope.find = function() {
        StudentInStudio.query(function(studentinstudio) {
             studentinstudio.forEach(function(sis) {
                if (sis.IdStudent == $scope.global.user.id){
                    $scope.studentinstudio.push(sis); //yana: check if data relavent?
                }    
            }, this);
        })

        Studios.query(function (studios) {
            $scope.studios = studios;
            $scope.studentinstudio.forEach(function(sis) {
                $scope.studios.forEach(function(studio) {
                    if(studio.id == sis.Studio){
                        sis.Studio = studio.Name;
                    }
                }, this);
            }, this);           
        });
            
        Instructors.query(function (instructors) {
            $scope.instructors = instructors;
            $scope.studentinstudio.forEach(function(sis) {
                $scope.instructors.forEach(function(instructor) {
                    if(instructor.id == sis.Instructor){
                        sis.Instructor = instructor.FirstName + " " + instructor.LastName ;
                    }
                }, this);
            }, this);           
        });  
    };

    $scope.find();
}]);