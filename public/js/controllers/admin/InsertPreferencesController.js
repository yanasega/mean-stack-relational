angular.module('mean.system').controller('InsertPreferencesController', ['$scope', '$resource', 'Registrations','Preferences' ,'Global',
 '$window','Students','Studios','$http',function ($scope, $resource , Registrations,Preferences,Global,$window,Students,Studios,$http) {
    console.log("InsertPreferencesController");
    $scope.global = Global;
    $scope.RegOpen = false;
    $scope.doneUpdate = false;
    $scope.NotValid = false;
    $scope.studios = [];
    $scope.registration = null;
    $scope.choosenPrefs = {};
    $scope.general = {};
    $scope.doneInsert = false;
    $scope.preferences = [];
    $scope.error = null;
    //$scope.items = [1,2,3,4,5];
    $scope.data = [];

    $scope.checkReg = function(){
        Registrations.query(function(registrations) {
            registrations.forEach(function(registration) {
                if (registration.IsActive == true){
                    $scope.registration = registration.id;
                    $scope.RegOpen = true;
                    $http.get('/findstudentpreference/' + $scope.global.user.id + '/' + registration.id).success(function(respData){
                        console.log(respData.length);
                        if(respData.length){
                                $scope.doneInsert = true;
                                $scope.message = "כבר הזנת העדפות לסמסטר זה.";
                        }
                    }).error(function(err){
                        $scope.RegOpen = true;
                        $scope.error = "התרחשה שגיאה בעת טעינת הנתונים";
                    })
                }
            }, this);
        }, function(err){
            $scope.RegOpen = true;
            $scope.error = "התרחשה שגיאה בעת טעינת הנתונים";
        });
        $scope.findOne();

    }


    $scope.findOne = function() {
        Students.get({
            studentId: $scope.global.user.id
        }, function(student) {
          if (student.CurrentYear != '6'){
            $scope.student = student;
          }
          else{
            $scope.RegOpen = true;
            $scope.error = "הנך מוגדר כסטודנט שסיים את התואר ולכן אינך יכול להזין העדפות";
          }
        }, function(err){
            $scope.RegOpen = true;
            $scope.error = "פרטייך לא נמצאו במסד הנתונים - התרחשה שגיאה בעת טעינת הנתונים";
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
        },function (err) {
            $scope.RegOpen = true;
            $scope.error = "התרחשה שגיאה בעת טעינת קבוצות הסטודיו.";
        });


    }


    $scope.updateStudent = function(){
        //update student
        var student = $scope.student;
        student.Generalaverage = $scope.average;
        student.LastStudioGrade = $scope.studioaverage;
        student.CurrentYear = $scope.currentyear;
        student.Semester = $scope.semester;

        if (!student.updated) {
            student.updated = [];
        }
        student.updated.push(new Date().getTime());
        student.$update(function() {
            if (student.IsValid == false && student.CurrentYear == '5'){
                $scope.NotValid = true;
            }
            $scope.doneUpdate = true;
            $scope.getStudios();
        }, function (err) {
            $scope.RegOpen = true;
            $scope.error = "התרחשה שגיאה בעת שמירת הנתונים.";
        });
    }

    $scope.insertPreferences = function(){
        angular.forEach($scope.data,function(value,key){
            // console.log($scope.data[key]);
            // console.log(key);
            var pref = new Preferences({
                Id: $scope.student.id,
                IdS: $scope.data[key].id,
                IdR: $scope.registration,
                StudentYear: $scope.currentyear,
                Semester: $scope.semester,
                Rate : key +1
            });

            pref.$save(function(response) {
                $scope.doneInsert = true;
                $scope.doneUpdate = false;
                $scope.message = "העדפות נשמרו בהצלחה!";
            }, function (error) {
                $scope.error = "התרחשה שגיאה בעת שמירת הנתונים";
            });
        });

    }

    // $scope.findOne();
    $scope.checkReg();

}]).filter('arrayDiff', function() {
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
