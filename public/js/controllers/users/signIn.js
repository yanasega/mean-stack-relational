angular.module('mean.auth').controller('signIn', ['$scope', '$window', 'Global', '$state', 'LogIn',
'$http','$stateParams', function ($scope, $window, Global, $state, LogIn,$http,$stateParams) {
    $scope.global = Global;
    $scope.IsOk = true;
    $scope.show = false;
    $scope.error = false;
    $scope.sending = false;

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
        $scope.sending = true;
        var data = {
            email: $scope.email
        };

        $http.post('/password/forgot', data)
        .success(function (data, status, headers, config) {
            $scope.sending = false;
            $scope.email = null;
            $scope.show = true;
        })
        .error(function (data, status, header, config) {
            $scope.sending = false;            
            $scope.email = null;            
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
                if (data.message == "passwords do not match."){
                    $scope.show = true;
                    $scope.message = "הסיסמאות אינן תואמות.";

                }
                else{
                    $scope.show = true;
                    $scope.message = "התרחשה שגיאה בשרת";
                    
                }
                $scope.password = null;
                $scope.passwordtwo = null;
        });
    }


}]);