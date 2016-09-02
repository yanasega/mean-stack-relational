ngular.module('mean.system').controller('RegistrationController', ['$scope', '$resource', 'Registrations' ,'Global', '$window',function ($scope, $resource , Registrations,Global,$window) {
    console.log("RegistrationController");
    $scope.global = Global;
    $scope.showreg = false;
    $scope.status = null;
    
    $scope.openRegistration = function() {
        var reg = new Registrations({
            startdate: $scope.startdate,
            enddate: $scope.enddate,
            semester: $scope.semester
        });

        reg.$save(function(response) {
            //yana: add check if response valid?
        });
        $scope.status = "Registration opened successfully.";

    };
 
     $scope.find = function() {
        Registrations.query(function(registrations) {
            $scope.registrations = registrations; //yana: check if data relavent?
            $scope.showreg = true;
        });
    };

    $scope.remove = function(registration) {
        if (registration) {
            registration.$remove();  

            // for (var i in $scope.registrations) {
            //     if ($scope.registrations[i] === registration) {
            //         $scope.registrations.splice(i, 1);
            //     }
            // }
        }
        else {
            $scope.registration.$remove();
            //$state.go('articles');
        }
    };
  
    $scope.find();

}]);
