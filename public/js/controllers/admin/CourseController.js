angular.module('mean.system').controller('CourseController', ['$scope', '$resource' ,'Global', 'Courses','$window',function ($scope, $resource ,Global ,Courses ,$window) {
    console.log("CourseController");
    $scope.global = Global;
    $scope.showcourse = true;    

    $scope.addCourse = function() {
        var course = new Courses({

			Id: $scope.id,
			Id_c: $scope.id,
            Name: $scope.name,
			CreditPoints: $scope.creditpoints
        });
        course.$save(function(response) {
            $scope.find();
            //yana: add check if response valid?
        });
        $scope.clear();
    };

     $scope.find = function() {
        Courses.query(function(courses) {
            $scope.courses = courses; //yana: check if data relavent?
            $scope.showcourse = true;
        });
    };

    $scope.remove = function(course) {
        if (course) {
            course.$remove();  

            for (var i in $scope.courses) {
                if ($scope.courses[i] === course) {
                    $scope.courses.splice(i, 1);
                }
            }
        }
        else {
            $scope.course.$remove();
            $state.go('courses'); //yana: test
        }
        $scope.clear();
    };

    $scope.clear = function(){
        $scope.id = null;
        $scope.name = null;
        $scope.creditpoints = null;
        // $scope.ismandatory = null;
    };

    // $scope.filterYearOptions = {
    //     stores: [
    //     {id : 2, name : 'Filter by year...', years: 'Filter by year...' },
    //     {id : 3, name : '3rd-4th', years: '3rd-4th' },
    //     {id : 4, name : '5th', years: '5th' }
    //     ]
    // };

    // $scope.filterYear = {
    //     store: $scope.filterYearOptions.stores[0]
    // }

    // $scope.yearFilter = function (data) {
    //     if (data.Relevant_years === $scope.filterYear.store.years) {
    //         return true;
    //     } else if ($scope.filterYear.store.years === 'Filter by year...') {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }; 

    // $scope.filterSemesterOptions = {
    //     stores: [
    //     {id : 2, name : 'Filter by semester...', semesters: 'Filter by semester...' },
    //     {id : 3, name : 'Winter', semesters: 'Winter' },
    //     {id : 4, name : 'Spring', semesters: 'Spring' }
    //     ]
    // };

    // $scope.filterSemester = {
    //     store: $scope.filterSemesterOptions.stores[0]
    // }

    // $scope.semesterFilter = function (data) {
    //     if (data.Semester === $scope.filterSemester.store.semesters) {
    //         return true;
    //     } else if ($scope.filterSemester.store.semesters === 'Filter by semester...') {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }; 

    $scope.find();
}]);