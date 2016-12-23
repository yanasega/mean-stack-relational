angular.module('mean.auth').controller('signIn', ['$scope', '$window', 'Global', '$state', 'LogIn',
'$http','$stateParams', function ($scope, $window, Global, $state, LogIn,$http,$stateParams) {
    $scope.global = Global;
    $scope.IsOk = true;
    $scope.show = false;
    $scope.error = false;

    $scope.signIn = function(user) {

        var logIn = new LogIn({
            email: user.email,
            password: user.password
        });

        logIn.$save(function(response) {
            if(response.status === 'success'){
                $http.get('/isadmin/' + user.email).success(function(res){
                    if(res.IsAdmin){ //if user is admin
                        $window.location.href = '/adminhome'; 
                    }
                    else{//if user is student
                        $window.location.href = '/home';
                    }
                })
                
 
            }
            else{
                console.log(response.body);
                $scope.IsOk = false;
            }
        });
    };

    $scope.sendemail =  function(){
        var data = {
            email: $scope.email
        };

        $http.post('/password/forgot', data)
        .success(function (data, status, headers, config) {
            $scope.show = true;
        })
        .error(function (data, status, header, config) {
            $scope.error = true;
        });
    }

    $scope.changepass =  function(){
        var data = {
                password: $scope.password,
                passwordtwo: $scope.passwordtwo,
                token: $stateParams.token
        };

        $http.post('/password/reset/'+$stateParams.token , data)
            .success(function (data, status, headers, config) {
                $window.location.href = '/home';
            })
            .error(function (data, status, header, config) {
                $scope.error = true;
        });
    }


}]);