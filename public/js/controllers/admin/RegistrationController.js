angular.module('mean.system').controller('RegistrationController', ['$scope', '$resource', 'Registrations' ,'$stateParams','Global', '$window','$state','Studios','$http'
,function ($scope, $resource , Registrations,$stateParams,Global,$window,$state,Studios,$http) {
    console.log("RegistrationController");
    $scope.global = Global;
    $scope.showreg = false;
    $scope.status = null;
    $scope.RegEmpty = null;

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    $scope.openRegistration = function() {
        
        var reg = new Registrations({
            StartDate: new Date(),
            EndDate: null,
            Semester: $scope.semester,
            IsActive: true
        });

        reg.$save(function(response) {
            $scope.find();
            //update all studios of the same semester as the registration to active : decided to let the user decide.
            // Studios.query(function(studios){
            //     studios.forEach(function(studio) {
            //         if ($scope.semester == studio.Semester){
            //             studio.IsActive = true;
            //             if (!studio.updated) {
            //                 studio.updated = [];
            //             }
            //             studio.updated.push(new Date().getTime());
            //             studio.$update(function() {
            //             });
            //         }
            //         else{
            //             if (studio.RelevantYears !== "5"){
            //                 studio.IsActive = false;
            //                 if (!studio.updated) {
            //                     studio.updated = [];
            //                 }
            //                 studio.updated.push(new Date().getTime());
            //                 studio.$update(function() {
            //                 });
            //             }
            //         }
            //     }, this);
            // });

                
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
                    if(reg.IsActive == true){
                        $scope.RegEmpty = false;
                        // sleep(1500);
                        // $scope.showreg = true;
                    }
                }, this);
                if ($scope.RegEmpty == null){
                    $scope.RegEmpty = true;
                }
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

    $scope.update = function(reg) {
        var registration = reg;
        registration.EndDate = new Date();
        registration.IsActive = false;
        if (!registration.updated) {
            registration.updated = [];
        }
        registration.updated.push(new Date().getTime());
        registration.$update(function() {
            $scope.RegEmpty = true;
            // $state.go('ViewReg',{registrationId : registration.id})

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
            $state.go('registrations'); //yana: test
        }
    };


    $scope.find();

}]);