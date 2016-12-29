angular.module('mean.system').controller('ViewPreferencesController', ['$scope', '$resource', 'Registrations','Preferences' ,'Global', '$window','Studios'
,'$http',function ($scope, $resource , Registrations,Preferences,Global,$window,Studios,$http) {
    $scope.global = Global;

    console.log("ViewPreferencesController");
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
        $http.get('/getallstudentpreference/' + $scope.global.user.id).success(function(respData){
            respData.forEach(function(preference) {
                    if($scope.preferences == null){
                        $scope.preferences = {};
                    }
                    if ($scope.preferences[preference.IdR]){

                        $scope.preferences[preference.IdR].push(preference); 
                    }
                    else{
                        $scope.preferences[preference.IdR] = [];
                        $scope.preferences[preference.IdR].push(preference); 
                        
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
        }).error(function(err){
            $scope.showpref = true;         
            $scope.loaderror = true;           
        })


    };

    $scope.find();

}]);