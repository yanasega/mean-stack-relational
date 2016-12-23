angular.module('mean.system').controller('EditPreferencesController', ['$scope', '$resource', 'Registrations','Preferences' ,'Global', '$window','Students','Studios',
'StudentInStudio','$stateParams','$http',function ($scope, $resource , Registrations,Preferences,Global,$window,Students,Studios,StudentInStudio,$stateParams,$http) {
    $scope.global = Global;

    console.log("EditPreferencesController");
    $scope.studentinstudio = [];
    $scope.preferences = {};
    $scope.showpref = false;
    $scope.RegOpen = false;

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    $scope.isRegOpen = function (idr) {
        Registrations.get({
            registrationId: $stateParams.PrfId
        }, function(reg) {
            if(reg.IsActive){
                $scope.RegOpen= true;
                $scope.registration = reg.id;
            }
            else{
                $scope.RegOpen= false;
            }
        });
    }
    $scope.doneUpdate = false;
    $scope.NotValid = false;
    $scope.studios = [];
    $scope.registration = null;
    $scope.choosenPrefs = {};
    $scope.general = {};
    $scope.doneInsert = false;
    $scope.preferences = [];
    $scope.studentinstudio = [];

    //$scope.items = [1,2,3,4,5];
    $scope.data = [];


    $scope.findOne = function() {
        Students.get({
            studentId: $scope.global.user.id
        }, function(student) {
            $scope.student = student;
            $scope.isRegOpen(); 
            $scope.getStudios();
            $scope.doneUpdate = true;
        });
    };



    $scope.getStudios = function(){
        Studios.query(function(studios) {
            // $scope.studios = studios;
            if ($scope.student.CurrentYear == '5'){
                studios.forEach(function(studio) {
                    if(studio.RelevantYears === '5' && studio.Semester == $scope.student.Semester && studio.IsActive){
                        $scope.studios.push(studio);
                    }
                }, this);
            }
            else{
                studios.forEach(function(studio) {
                    if(studio.RelevantYears == '3,4'&& studio.Semester == $scope.student.Semester && studio.IsActive){
                        $scope.studios.push(studio);
                    }                  
                }, this);
            }
        });
    }

    
    $scope.IsInPref = function(stud){
        return true;
    }

    $scope.updatePreferences = function(){
        angular.forEach($scope.data,function(value,key){
            // console.log($scope.data[key]);
            // console.log(key);
            // var pref = new Preferences({
            //     Id: $scope.student.id,
            //     IdS: $scope.data[key].id,
            //     IdR: $scope.registration,
            //     StudentYear: $scope.currentyear,
            //     Semester: $scope.semester,
            //     Rate : key +1
            // });
            // if (!pref.updated) {
            //     pref.updated = [];
            // }
            // pref.updated.push(new Date().getTime());
            $http.put('/preferences/' + $scope.student.id +'/' + $scope.registration + '/' +$scope.data[key].id + '/' + (key +1))
            .success(function (data, status, headers) {
                $scope.ServerResponse = data;
                $scope.doneInsert = true;
                 $scope.message = "העדפות נשמרו בהצלחה!";
            }).error (function(err){

            })
            // pref.$update(function() {
            //     $scope.doneInsert = true;
            //     $scope.message = "העדפות נשמרו בהצלחה!";
            // });

        });         

    }

    $scope.findOne();
    //$scope.find();
    

}]).filter('arrayDiffedit', function() {
    return function(array, diff) {
      var i, item, 
          newArray = [],
          exception = Array.prototype.slice.call(arguments, 2);
      
      for(i = 0; i < array.length; i++) {
        item = array[i];
        if(diff.indexOf(item) < 0 || exception.indexOf(item) >= 0) {
          newArray.push(item);
        }
      }
      
      return newArray;
      
    };
  });