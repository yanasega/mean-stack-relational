angular.module('mean.system').controller('StudioController', ['$scope', '$resource' ,'Global', 'Studios','$window',function ($scope, $resource ,Global ,Studios ,$window) {
    console.log("StudioController");
    $scope.global = Global;
    $scope.showstud = false;    
    $scope.isactive = true;

    $scope.addStudio = function() {
        var studio = new Studios({
			Id_s: $scope.Id_s,
            Name: $scope.name,
			Instructor: $scope.instructor,
            Description: $scope.description,
            Relevant_years: $scope.relevantyears,
            Semester: $scope.semester,
            IsActive: $scope.isactive,
            LinkSylabus:$scope.sylabus
        });
        studio.$save(function(response) {
            $scope.find();
            //yana: add check if response valid?
        });
        $scope.clear();
    };

     $scope.find = function() {
         //yana:update status registration if active.
        Studios.query(function(studios) {
            $scope.studios = studios; //yana: check if data relavent?
            $scope.showstud = true;
        });
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
        $scope.description = null;
        $scope.relevantyears = null;
        $scope.semester = null;
        $scope.isactive = null;
        $scope.sylabus = null;
        $scope.Id_s = null;
    };

    $scope.filterYearOptions = {
        stores: [
        {id : 2, name : 'Filter by year...', years: 'Filter by year...' },
        {id : 3, name : '3rd-4th', years: '3rd-4th' },
        {id : 4, name : '5th', years: '5th' }
        ]
    };

    $scope.filterYear = {
        store: $scope.filterYearOptions.stores[0]
    }

    $scope.yearFilter = function (data) {
        if (data.Relevant_years === $scope.filterYear.store.years) {
            return true;
        } else if ($scope.filterYear.store.years === 'Filter by year...') {
            return true;
        } else {
            return false;
        }
    }; 

    $scope.filterSemesterOptions = {
        stores: [
        {id : 2, name : 'Filter by semester...', semesters: 'Filter by semester...' },
        {id : 3, name : 'Winter', semesters: 'Winter' },
        {id : 4, name : 'Spring', semesters: 'Spring' }
        ]
    };

    $scope.filterSemester = {
        store: $scope.filterSemesterOptions.stores[0]
    }

    $scope.semesterFilter = function (data) {
        if (data.Semester === $scope.filterSemester.store.semesters) {
            return true;
        } else if ($scope.filterSemester.store.semesters === 'Filter by semester...') {
            return true;
        } else {
            return false;
        }
    }; 

    $scope.find();
}]);