angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', 'SignOut', '$state','$window', function ($scope, Global, SignOut, $state,$window) {
    $scope.global = Global;
    $scope.menu = [{
        "title": "Articles",
        "state": "articles"
    }, {
        "title": "Create New Article",
        "state": "createArticle"
    }
    ];
    
    $scope.isCollapsed = false;

    $scope.SignOut = function(){
        SignOut.get(function(response){
            if(response.status === 'success'){
                $scope.global = null;
                $state.go('home');
            }
        });
    }

    $scope.redirect = function(){
        if($scope.global.user.IsAdmin){ //if user is admin
            $window.location.href = '/adminhome'; 
        }
        else{//if user is student
            $window.location.href = '/home';
        }
    }


}]);