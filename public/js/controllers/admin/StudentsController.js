angular.module('mean.system').controller('StudentsController', ['$scope', '$resource' ,'Global', '$window','Upload','$location','Students','Studios','$stateParams',
'Preferences','StudentInStudio','Instructors',function ($scope, $resource ,Global,$window,Upload,$location,Students,Studios,$stateParams,Preferences,StudentInStudio,Instructors) {
    console.log("StudentsController");
    $scope.status = null;
    $scope.showuser = true;
    $scope.preferences = [];
    $scope.studentinstudio = [];

    $scope.create = function(token) {
        $scope.upload = Upload.upload({
            url: '/upload',
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            file: token           
        }).success(function (response, status) {
                // Redirect after save
                $location.path('upload/' + response[0].filename);
                $scope.path = 'upload/' + response[0].filename;
                console.log($scope.path);
                $scope.status = "Upload finished successfully.";
                // Clear form fields
                        $scope.name = '';
                        $scope.token = '';
            }
        ).error(function (errorResponse) {
               $scope.error = errorResponse.data;
               $scope.status = "There was an error. File could not be uploaded.";
            }
        );
    };

    $scope.findOne = function() {
        Students.get({
            studentId: $stateParams.studentId
        }, function(student) {
            $scope.student = student;
        });

        Studios.query(function (studios) {
            $scope.studios = studios;
        })

        Instructors.query(function (instructors) {
            $scope.instructors = instructors;
        })

        StudentInStudio.query(function(studentinstudio) {
            studentinstudio.forEach(function(sis) {
                if (sis.IdStudent == $stateParams.studentId){
                    $scope.studios.forEach(function(studio) {
                        if(studio.id == sis.Studio){
                            sis.Studio = studio.Name;
                        }
                    }, this);
                    $scope.instructors.forEach(function(instructor) {
                        sis.Instructor = instructor.FirstName + " " + instructor.LastName;
                    }, this);

                    $scope.studentinstudio.push(sis);
                }              
            }, this);

        });


        // console.log($scope.preferences);
        Preferences.query(function(preferences) {
            preferences.forEach(function(preference) {
                if (preference.id == $stateParams.studentId){
                    $scope.preferences.push(preference); //yana: check if data relavent?
                }    
            }, this);
            $scope.preferences.forEach(function(preference) {
                $scope.studios.forEach(function(studio) {
                    if(studio.id == preference.idS){
                        preference.idS = studio.Name;
                    }
                }, this);
            }, this);
        });
    };

     $scope.find = function() {
         //yana:update status registration if active.
        Students.query(function(students) {
            $scope.students = students; //yana: check if data relavent?
            // $scope.showreg = true;
        });
    };

    $scope.remove = function(student) {
        if (student) {
            student.$remove();  
            for (var i in $scope.students) {
                if ($scope.students[i] === student) {
                    $scope.students.splice(i, 1);
                }
            }
        }
        else {
            $scope.student.$remove();
            $state.go('student'); //yana: test
        }
    };

    $scope.filterYearOptions = {
        stores: [
        {id : 2, name : 'Filter by year...', years: 'Filter by year...' },
        {id : 3, name : '3', years: 3 },
        {id : 4, name : '4', years: 4 },
        {id : 5, name : '5', years: 5 }
        ]
    };

    $scope.filterYear = {
        store: $scope.filterYearOptions.stores[0]
    }

    $scope.yearFilter = function (data) {
        // console.log(data.CurrentYear);
        // console.log(data.CurrentYear === 3);
        if (parseInt(data.CurrentYear) === $scope.filterYear.store.years) {
            return true;
        } else if ($scope.filterYear.store.years === 'Filter by year...') {
            return true;
        } else {
            return false;
        }
    }; 

    $scope.find();


}]);