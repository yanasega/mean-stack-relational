angular.module('mean.auth').controller('signIn', ['$scope', '$window', 'Global', '$state', 'LogIn', function ($scope, $window, Global, $state, LogIn) {
    $scope.global = Global;
    $scope.IsOk = true;

    $scope.signIn = function(user) {

        var logIn = new LogIn({
            email: user.email,
            password: user.password
        });

        logIn.$save(function(response) {
            if(response.status === 'success'){
                if($scope.global.user.IsAdmin){ //if user is admin
                   $window.location.href = '/adminhome'; 
                }
                else{//if user is student
                    $window.location.href = '/home';
                }
 
            }
            else{
                console.log(response.body);
                $scope.IsOk = false;
            }
        });
    };


}]);