angular.module('mean.auth').controller('signUp', ['$scope', '$window', 'Global','$state', 'SignUp','Students', function ($scope, $window, Global, $state, SignUp,Students) {
    $scope.global = Global;
    $scope.status = null;
    $scope.signUp = function(user) {

        var signUp = new SignUp({
            FirstName: user.firstname,
            LastName: user.lastname,
            Email: user.email,
            id : user.id,
            password : user.password
        });

        signUp.$save(function(response) {
            if(response.status === 'success'){
                Students.get({
                    studentId: user.id
                }).$promise.then(function successCallback(response) {
                    var studentUpdated = response;
                        studentUpdated.FirstName = user.firstname;
                        studentUpdated.LastName = user.lastname;
                        studentUpdated.Email = user.email;
                        studentUpdated.Gender = user.gender;
                        studentUpdated.Semester = user.semester;
                        studentUpdated.IsValid = false;
                        studentUpdated.Generalaverage = user.generalaverage;
                        studentUpdated.LastStudioGrade = user.laststudiograde;
                        studentUpdated.CurrentYear = user.currentyear ;                     
                        if (!studentUpdated.updated) {
                            studentUpdated.updated = [];
                        }
                        studentUpdated.updated.push(new Date().getTime());
                        studentUpdated.$update(function() {
                            console.log("updated");
                            $window.location.href = '/home';
                        });
                }, function errorCallback(response) {
                    var student = new Students({
                            FirstName: user.firstname,
                            LastName: user.lastname,
                            Email: user.email,
                            id : user.id,
                            Gender: user.gender,
                            Semester: user.semester,
                            IsValid: false,
                            Generalaverage: user.generalaverage,
                            LastStudioGrade: user.laststudiograde,
                            CurrentYear : user.currentyear
                        });
                        student.$save(function(response){
                            console.log("created");
                            $window.location.href = '/home';
                        });

                })
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