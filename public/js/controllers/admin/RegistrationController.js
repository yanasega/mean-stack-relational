angular.module('mean.system').controller('RegistrationController', ['$scope', '$resource', 'Registrations' ,'$stateParams','Global', '$window','$state',function ($scope, $resource , Registrations,$stateParams,Global,$window,$state) {
    console.log("RegistrationController");
    $scope.global = Global;
    $scope.showreg = true;
    $scope.status = null;
    $scope.RegEmpty = true;
    // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    // $scope.data = [300, 500, 100];

    $scope.openRegistration = function() {
        
        // $scope.checkIsActive();
        
        var reg = new Registrations({
            StartDate: new Date(),
            EndDate: null,
            Semester: $scope.semester,
            IsActive: true
        });

        reg.$save(function(response) {
            $scope.find();
            //yana: add check if response valid?
            // if(response.status === 'success'){
            //     $window.location.href = '/';
            // }
        });
        $scope.status = "Registration opened successfully.";
        // $scope.RegEmpty = false;
    };
 
     $scope.find = function() {
         //yana:update status registration if active.
        Registrations.query(function(registrations) {
            $scope.registrations = registrations;
            if(registrations.length != 0){
                registrations.forEach(function(reg) {
                    if(reg.IsActive == true){
                        $scope.RegEmpty = false;
                    }
                }, this);
            }
            // $scope.showreg = true;
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

    // $scope.checkIsActive = function(){
    //     if ($scope.startdate < Date.now() && $scope.enddate > Date.now()){
    //         $scope.IsActive = true;
    //     }
    //     else{
    //         $scope.IsActive = false;
    //     }
    // }

    $scope.find();

}]);
