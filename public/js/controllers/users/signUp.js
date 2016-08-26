angular.module('mean.auth').controller('signUp', ['$scope', '$window', 'Global','$state', 'SignUp', function ($scope, $window, Global, $state, SignUp) {
    $scope.global = Global;


    $scope.signUp = function(user) {

        var signUp = new SignUp({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            id : user.id,
            gender: user.gender,
            password : user.password,
            currentyear : user.currentyear
        });

        signUp.$save(function(response) {
            if(response.status === 'success'){
                $window.location.href = '/';
            }
        });
    };


}]);