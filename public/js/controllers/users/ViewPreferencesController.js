angular.module('mean.system').controller('ViewPreferencesController', ['$scope', '$resource', 'Registrations','Preferences' ,'Global', '$window','Students','Studios',
'StudentInStudio',function ($scope, $resource , Registrations,Preferences,Global,$window,Students,Studios,StudentInStudio) {
    $scope.global = Global;

    console.log("ViewPreferencesController");
    $scope.studentinstudio = [];
    $scope.preferences = null;
    $scope.showpref = false;
    $scope.loaderror = false;

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    $scope.find = function() {

        Preferences.query(function(preferences) {
            preferences.forEach(function(preference) {
                if (preference.Id == $scope.global.user.id){
                    if($scope.preferences == null){
                        $scope.preferences = {};
                    }
                    if ($scope.preferences[preference.IdR]){

                        $scope.preferences[preference.IdR].push(preference); //yana: check if data relavent?
                    }
                    else{
                        $scope.preferences[preference.IdR] = [];
                        $scope.preferences[preference.IdR].push(preference); //yana: check if data relavent?
                        
                    }
                }    
            }, this);

            Studios.query(function (studios) {
                $scope.studios = studios;
                angular.forEach($scope.preferences,function(value,key){
                    
                    $scope.preferences[key].forEach(function(preference) {
                        $scope.studios.forEach(function(studio) {
                            if(studio.id == preference.IdS){
                                preference.IdS = studio.Name;
                            }
                        }, this);
                    }, this);

                });           
            }, function (err) {
                $scope.showpref = true;       
                $scope.loaderror = true;
            });  

            $scope.showpref = true; 

        }, function(err){
            $scope.showpref = true;         
            $scope.loaderror = true;
        });
    };

    $scope.find();

}]);