angular.module('mean.system').controller('RegistrationController', ['$scope', '$resource', 'Registrations' ,'$stateParams','Global', '$window','$state','Studios','$http'
,function ($scope, $resource , Registrations,$stateParams,Global,$window,$state,Studios,$http) {
    console.log("RegistrationController");
    $scope.global = Global;
    $scope.showreg = false;
    $scope.status = null;
    $scope.RegEmpty = true;
    $scope.dowloaderror = false;

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    $scope.openRegistration = function() {
        console.log($scope.semester);
        var reg = new Registrations({
            StartDate: new Date(),
            EndDate: null,
            Semester: $scope.semester,
            IsActive: true
        });

        reg.$save(function(response) {
            $scope.find();          
            if($scope.semester == 'spring'){
                $http.get('/setfifthtosix').success(function(res){
                    console.log("success");
                })
            }
        }); 

        $scope.status = "הרשמה נפתחה בהצלחה.";
    };
 
     $scope.find = function() {
        Registrations.query(function(registrations) {
            $scope.registrations = registrations;
            if(registrations.length != 0){
                registrations.forEach(function(reg) {
                    reg.message = "פתיחה מחדש";
                    if(reg.IsActive == true){
                        reg.message = "סגירת הרשמה";
                        $scope.RegEmpty = false;
                        // sleep(1500);
                        // $scope.showreg = true;
                    }
                }, this);
                // if ($scope.RegEmpty == null){
                //     $scope.RegEmpty = true;
                // }
            }
        });
    };

    $scope.findOne = function() {
        Registrations.get({
            registrationId: $stateParams.registrationId
        }, function(registration) {
            $scope.registration = registration;
            $scope.registration.StartDate = new Date($scope.registration.StartDate);
            $scope.registration.EndDate = new Date($scope.registration.EndDate);

        });
    };

    $scope.update = function(reg,state) {
        var registration = reg;
        registration.EndDate = new Date();
        registration.IsActive = state;
        if (!registration.updated) {
            registration.updated = [];
        }
        registration.updated.push(new Date().getTime());
        registration.$update(function() {
            if (!state){
                $scope.RegEmpty = true;
                reg.message = "פתיחה מחדש";
                
            }
            else{
                $scope.RegEmpty = false;
                reg.message = "סגירת הרשמה";
            }
            

        });
    };
   
    $scope.remove = function(registration) {
        if (registration) {
            registration.$remove();  
            for (var i in $scope.registrations) {
                if ($scope.registrations[i] === registration) {
                    $scope.registrations.splice(i, 1);
                }
            }
        }
        else {
            $scope.registration.$remove();
            $state.go('registrations');
        }
    };

    $scope.DownloadPref = function (regId){
        var a = null;
        $http.get('/downloadprefs/' + regId).success(function(respData){
            console.log(respData.indexOf("no success creating the file"));
            if (respData.indexOf("no success creating the file") == -1){
                $window.location = 'uploads/' + respData.replace(/['"]+/g, '');
                // $http.get('/deletedownload/' + a).success(function(resp){

                // })
            }
            else{
                $scope.dowloaderror = true;
            }
        }).error(function (errorResponse) {
            $scope.dowloaderror = true;
        });
    }

    $scope.find();

}]);