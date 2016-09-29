angular.module('mean.auth').controller('signUp', ['$scope', '$window', 'Global','$state', 'SignUp', function ($scope, $window, Global, $state, SignUp) {
    $scope.global = Global;
    $scope.status = null;

    $scope.signUp = function(user) {

        var signUp = new SignUp({
            FirstName: user.firstname,
            LastName: user.lastname,
            Email: user.email,
            id : user.id,
            Gender: user.gender,
            Semester: user.semester,
            IsValid: false,
            Generalaverage: user.generalaverage,
            LastStudioGrade: user.laststudiograde,
            password : user.password,
            CurrentYear : user.currentyear
        });

        signUp.$save(function(response) {
            if(response.status === 'success'){
                $window.location.href = '/';
            }
            else{
                user.firstname = null;
                user.lastname = null;
                user.email = null;
                user.id = null;
                user.gender = null;
                user.semester = null;
                user.generalaverage = null;
                user.laststudiograde = null;
                user.password = null;
                user.currentyear = null;
                $scope.status = "Could not insert user - id not in database.";           
            }
        });
    };


}]);