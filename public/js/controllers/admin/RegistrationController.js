angular.module('mean.system').controller('RegistrationController', ['$scope', '$resource', 'Registrations' ,'Global', '$window',function ($scope, $resource , Registrations,Global,$window) {
    console.log("RegistrationController");
    $scope.global = Global;
    $scope.showreg = false;
    $scope.status = null;
    // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    // $scope.data = [300, 500, 100];

    $scope.openRegistration = function() {
        //yana:change all students - lift by year.
        var reg = new Registrations({
            startdate: $scope.startdate,
            enddate: $scope.enddate,
            semester: $scope.semester
        });

        reg.$save(function(response) {
            //yana: add check if response valid?
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
            $scope.showreg = true;
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
