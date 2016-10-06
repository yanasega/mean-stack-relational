angular.module('mean.system').controller('ViewPreferencesController', ['$scope', '$resource', 'Registrations','Preferences' ,'Global', '$window','Students','Studios',
'StudentInStudio',function ($scope, $resource , Registrations,Preferences,Global,$window,Students,Studios,StudentInStudio) {
    $scope.global = Global;

    console.log("ViewPreferencesController");
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

        Preferences.query(function(preferences) {
            preferences.forEach(function(preference) {
                if (preference.Id == $scope.global.user.id){
                    $scope.preferences.push(preference); //yana: check if data relavent?
                }    
            }, this);
            Studios.query(function (studios) {
                $scope.studios = studios;
                $scope.preferences.forEach(function(preference) {
                    $scope.studios.forEach(function(studio) {
                        if(studio.id == preference.IdS){
                            preference.IdS = studio.Name;
                        }
                    }, this);
                }, this);           
            });         
        });
    };

    $scope.find();
}]);