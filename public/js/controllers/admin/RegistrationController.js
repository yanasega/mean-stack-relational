angular.module('mean.system').controller('RegistrationController', ['$scope', '$resource', 'Registrations' ,'$stateParams','Global', '$window','$state',function ($scope, $resource , Registrations,$stateParams,Global,$window,$state) {
    console.log("RegistrationController");
    $scope.global = Global;
    $scope.showreg = true;
    $scope.status = null;
    $scope.IsActive = null;
    // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    // $scope.data = [300, 500, 100];

    $scope.openRegistration = function() {
        
        $scope.checkIsActive();
        
        var reg = new Registrations({
            StartDate: $scope.startdate,
            EndDate: $scope.enddate,
            Semester: $scope.semester,
            IsActive: $scope.IsActive
        });

        reg.$save(function(response) {
            //yana: add check if response valid?
            // if(response.status === 'success'){
            //     $window.location.href = '/';
            // }
        });
        $scope.startdate = null;
        $scope.enddate = null;
        $scope.semester = null;
        $scope.status = "Registration opened successfully.";
    };
 
     $scope.find = function() {
         //yana:update status registration if active.
        Registrations.query(function(registrations) {
            $scope.registrations = registrations; //yana: check if data relavent?
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

    $scope.update = function() {
        var registration = $scope.registration;
        if (!registration.updated) {
            registration.updated = [];
        }
        registration.updated.push(new Date().getTime());
        registration.$update(function() {
            $state.go('ViewReg',{registrationId : registration.id})

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

    $scope.checkIsActive = function(){
        if ($scope.startdate < Date.now() && $scope.enddate > Date.now()){
            $scope.IsActive = true;
        }
        else{
            $scope.IsActive = false;
        }
    }

    $scope.find();

}]);
