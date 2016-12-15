angular.module('mean.system').controller('StudioController', ['$scope', '$resource' ,'Global','$stateParams', 'Studios','$window','Upload','Instructors','SubjectMap','$state',function ($scope, $resource ,Global ,$stateParams,Studios ,$window,Upload,Instructors,SubjectMap,$state) {
    console.log("StudioController");
    $scope.global = Global;
    $scope.showstud = false;    
    $scope.isactive = true;
    $scope.sylabus = null;

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
            break;
            }
        }
    }

    $scope.addStudio = function() {
        if ($scope.sylabus != null){
            $scope.upload = Upload.upload({
                url: '/upload',
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'},
                file: $scope.sylabus           
            }).success(function (response, status) {
                    $scope.sylabus = response[0].filename;
                    var studio = new Studios({
                        IdC: $scope.Id_s,
                        Name: $scope.name,
                        Instructor: $scope.instructor.id,
                        Subject: $scope.subject.id,
                        RelevantYears: $scope.relevantyears,
                        Semester: $scope.semester,
                        IsActive: true,
                        LinkSylabus: $scope.sylabus
                    });
                    studio.$save(function(response) {
                        $scope.find();
                        //yana: add check if response valid?
                    });
                    $scope.clear();
                }
            ).error(function (errorResponse) {
                $scope.error = errorResponse.data;
                $scope.status = "There was an error. File could not be uploaded.";
                }
            );
        }
        else {
            var studio = new Studios({
                IdC: $scope.Id_s,
                Name: $scope.name,
                Instructor: $scope.instructor.id,
                Subject: $scope.subject.id,
                RelevantYears: $scope.relevantyears,
                Semester: $scope.semester,
                IsActive: $scope.isactive,
                LinkSylabus: $scope.sylabus
            });
            studio.$save(function(response) {
                $scope.find();
            });
            $scope.clear();
        }
    };

     $scope.find = function() {

        SubjectMap.query(function(subjects) {
            sleep(500);
            $scope.subjects = subjects; //yana: add error
        });

        Instructors.query(function(instructors) {
            sleep(500);
            $scope.instructors = instructors; //yana: add error
        });

        Studios.query(function(studios) {
            $scope.studios = studios; //yana: add error
            console.log(studios);
            sleep(500);
            $scope.studios.forEach(function(studio) {
               $scope.subjects.forEach(function(subject) {
                   if(subject.id == studio.Subject){
                        studio.Subject = subject.Subject;
                   }
               }, this);
               $scope.instructors.forEach(function(instructor) {
                   if(instructor.id == studio.Instructor){
                        studio.Instructor = instructor.FirstName + " " + instructor.LastName;
                   }                  
               }, this); 
            }, this);
            sleep(1500);
            $scope.showstud = true;
        });
        

    };

    $scope.findOne = function() {

        Studios.get({
            studioId: $stateParams.studioId
        }, function(studio) {
            $scope.studio = studio;
            $scope.instructors.forEach(function(instructor) {
                if (instructor.id == $scope.studio.Instructor){
                    $scope.studio.instructor = instructor;
                }
            }, this);
            $scope.subjects.forEach(function(subject) {
                if (subject.id == $scope.studio.Subject){
                    $scope.studio.subject = subject;
                }
            }, this);
        });
    };

    $scope.update = function() {
        var studio = $scope.studio;
        if ($scope.sylabus == null){
            if (!studio.updated) {
                studio.updated = [];
            }
            studio.updated.push(new Date().getTime());
            studio.$update(function() {
                $state.go('ViewStudio',{studioId : studio.id})

            });
        }
        else{
            $scope.upload = Upload.upload({
                url: '/upload',
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'},
                file: $scope.sylabus           
            }).success(function (response, status) {
                $scope.studio.LinkSylabus = response[0].filename;
                if (!studio.updated) {
                    studio.updated = [];
                }
                studio.updated.push(new Date().getTime());
                studio.$update(function() {
                    $state.go('ViewStudio',{studioId : studio.id})

                });
            }
            ).error(function (errorResponse) {
                $scope.error = errorResponse.data;
                $scope.status = "There was an error. File could not be uploaded.";
                }
            );            
        }
    };

    $scope.remove = function(studio) {
        if (studio) {
            studio.$remove();  

            for (var i in $scope.studios) {
                if ($scope.studios[i] === studio) {
                    $scope.studios.splice(i, 1);
                }
            }
        }
        else {
            $scope.studio.$remove();
            $state.go('studios'); //yana: test
        }
        $scope.clear();
    };

    $scope.clear = function(){
        $scope.name = null;
        $scope.instructor = null;
        $scope.subject = null;
        $scope.relevantyears = null;
        $scope.semester = null;
        $scope.isactive = null;
        $scope.sylabus = null;
        $scope.Id_s = null;
    };

    $scope.openPdf = function(link){
        $window.open('uploads/' +link);
    }

    $scope.removeSylabus = function(){
        console.log($scope.studio);
        var studio = $scope.studio;
        if (!studio.updated) {
            studio.updated = [];
        }
        studio.LinkSylabus = null;
        studio.updated.push(new Date().getTime());
        studio.$update(function() {
            $scope.findOne();
        })        
    }

    $scope.filterYearOptions = {
        stores: [
        {id : 2, name : 'סנן לפני שנים...', years: 'סנן לפני שנים...' },
        {id : 3, name : '3,4', years: '3,4' },
        {id : 4, name : '5', years: '5' }
        ]
    };

    $scope.filterYear = {
        store: $scope.filterYearOptions.stores[0]
    }

    $scope.yearFilter = function (data) {
        if (data.RelevantYears === $scope.filterYear.store.years) {
            return true;
        } else if ($scope.filterYear.store.years === 'סנן לפני שנים...') {
            return true;
        } else {
            return false;
        }
    }; 

    $scope.filterSemesterOptions = {
        stores: [
        {id : 2, name : 'סנן לפי סמסטר...', semesters: 'סנן לפי סמסטר...' },
        {id : 3, name : 'winter', semesters: 'winter' },
        {id : 4, name : 'spring', semesters: 'spring' }
        ]
    };

    $scope.filterSemester = {
        store: $scope.filterSemesterOptions.stores[0]
    }

    $scope.semesterFilter = function (data) {
        if (data.Semester === $scope.filterSemester.store.semesters) {
            return true;
        } else if ($scope.filterSemester.store.semesters === 'סנן לפי סמסטר...') {
            return true;
        } else {
            return false;
        }
    }; 

    $scope.find();
}]);