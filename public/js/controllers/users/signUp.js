angular.module('mean.auth').controller('signUp', ['$scope', '$window', 'Global','$state', 'SignUp', function ($scope, $window, Global, $state, SignUp) {
    $scope.global = Global;


    $scope.signUp = function(user) {

        var signUp = new SignUp({
            FirstName: user.firstname,
            LastName: user.lastname,
            Email: user.email,
            id : user.id,
            Gender: user.gender,
            IsValid: false,
            Generalaverage: user.generalaverage,
            LastStudioGrade: user. laststudiograde,
            password : user.password,
            CurrentYear : user.currentyear
        });

        signUp.$save(function(response) {
            if(response.status === 'success'){
                $window.location.href = '/';
            }
        });
    };


}]);