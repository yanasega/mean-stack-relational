angular.module('mean.auth').controller('signIn', ['$scope', '$window', 'Global', '$state', 'LogIn','$http', function ($scope, $window, Global, $state, LogIn,$http) {
    $scope.global = Global;
    $scope.IsOk = true;

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
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
    }

    $scope.changepass =  function(){
        
    }


}]);