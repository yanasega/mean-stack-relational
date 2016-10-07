angular.module('mean.system').controller('StudentsController', ['$scope', '$resource' ,'Global', '$window','Upload','$location','Students','Studios','$stateParams',
'Preferences','StudentInStudio','Instructors','Tzs','$state','$http',function ($scope, $resource ,Global,$window,Upload,$location,Students,Studios,$stateParams,Preferences,StudentInStudio,Instructors,Tzs,$state,$http) {
    console.log("StudentsController");
    $scope.status = null;
    $scope.error = null;
    $scope.showuser = true;
    $scope.preferences = [];
    $scope.studentinstudio = [];
    $scope.years = {"3": 3, "4":4, "5":5};
    $scope.statuses = {"true": true, "false":false};
    
    $scope.create = function(){
        var tz = new Tzs({
            id : $scope.tz
        });
        tz.$save(function(response) {
            $scope.error = null;
            $scope.status = "Uploaded successfully id number: " + $scope.tz ;
            $scope.tz = null;
        });
        $scope.status = null;
        $scope.error = "There was an error while uploding the id: " + $scope.tz;
        $scope.tz = null;
    }

    $scope.addIds = function(){
        $scope.upload = Upload.upload({
                url: '/upload',
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'},
                file: $scope.Ids           
            }).success(function (response, status) {
                    $scope.TzFile = response[0].filename;
                    $http.get('/insertTz/' + $scope.TzFile).success(function(respData){ //yana: do I need to set the config.server????
                        if (respData[0].indexOf('done') !== -1){
                            $scope.error = null;
                            $scope.status = "File uploaded successfully.";
                            $scope.Ids = null;
                        }
                        else{
                            $scope.Ids = null;
                            $scope.status = null;
                            $scope.error = "There was an error. Files could not be inserted to the database.";                          
                        }
                    })
                }
            ).error(function (errorResponse) {
                $scope.Ids = null;
                $scope.status = null;
                $scope.error = "There was an error. File could not be uploaded.";
                }
            );
    }

    $scope.findStudent = function() {
        Students.get({
            studentId: $stateParams.studentId
        }, function(student) {
            $scope.student = student;
        });
    }

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
                if (preference.Id == $stateParams.studentId){
                    $scope.preferences.push(preference); //yana: check if data relavent?
                }    
            }, this);
            $scope.preferences.forEach(function(preference) {
                $scope.studios.forEach(function(studio) {
                    if(studio.id == preference.IdS){
                        preference.IdS = studio.Name;
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

    $scope.update = function() {
        var student = $scope.student;
        if (!student.updated) {
            student.updated = [];
        }
        student.updated.push(new Date().getTime());
        student.$update(function() {
        $state.go('StudentInfo',{studentId : student.id})

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