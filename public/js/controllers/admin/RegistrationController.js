// var myApp = angular.module('mean.system',[]);

// myApp.controller('RegistrationController', ['$scope', 'Global',function($scope, Global) {
//   $scope.global = Global;
//   console.log("yep");
// }]);

angular.module('mean.system').controller('RegistrationController', ['$scope', 'Global', function ($scope, Global) {
    
    console.log("RegistrationController");
    $scope.global = Global;
    $scope.startdate = null;
    $scope.enddate = null;
    $scope.semester = null;
    $scope.IsActive = null;
    $scope.status = null;

    $scope.openRegistration = function () {
        console.log($scope.startdate);
        sequelize.sync().success(function () {
                registration.create({
                Id_r: 2,
                Start_date: $scope.startdate,
                End_date: $scope.enddate,
                Current_year: 2016,
                Semester: $scope.semester,
                IsActive: 1,
                }).success(function (data) {
                console.log(data.values)
                })
        });

        // sequelize.query("INSERT INTO registration VALUES(000002,$scope.startdate,$scope.enddate,2016,$scope.semester,1)", { type: sequelize.QueryTypes.INSERT})
        // .then(function(users) {
        // We don't need spread here, since only the results will be returned for select queries
        // })
        // db.sequelize.query("INSERT INTO registration VALUES(000002,'" + videoURL + "','" + type + "')'", function(err){

        // });
        $scope.startdate = null;
        $scope.enddate = null;
        $scope.semester = null;
        $scope.status = "Registration opened successfully.";

    }

}]);
