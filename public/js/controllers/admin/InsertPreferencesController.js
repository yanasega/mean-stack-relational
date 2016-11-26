angular.module('mean.system').controller('InsertPreferencesController', ['$scope', '$resource', 'Registrations','Preferences' ,'Global', '$window','Students','Studios','StudentInStudio',function ($scope, $resource , Registrations,Preferences,Global,$window,Students,Studios,StudentInStudio) {
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
    $scope.studentinstudio = [];

    $scope.checkReg = function(){
        Registrations.query(function(registrations) {
            registrations.forEach(function(registration) {
                if (registration.IsActive == true){
                    $scope.registration = registration.id;
                    $scope.RegOpen = true;
                    Preferences.query(function(preferences){
                        preferences.forEach(function(pref) {
                            if (pref.IdR == $scope.registration && pref.Id == $scope.global.user.id)
                            $scope.doneInsert = true;
                            $scope.message = "You have already inserted preferences for this semester.";
                        }, this);
                    });
                }
            }, this);
        });
    }


    $scope.findOne = function() {
        Students.get({
            studentId: $scope.global.user.id
        }, function(student) {
            $scope.student = student;
        });
    };

    $scope.getStudios = function(){
        Studios.query(function(studios) {
            // $scope.studios = studios;
            if ($scope.student.CurrentYear == '5'){
                studios.forEach(function(studio) {
                    if(studio.RelevantYears === '5' && studio.Semester == $scope.student.Semester){
                        $scope.studios.push(studio);
                    }
                }, this);
            }
            else{
                studios.forEach(function(studio) {
                    if(studio.RelevantYears == '3,4'&& studio.Semester == $scope.student.Semester){
                        $scope.studios.push(studio);
                    }                  
                }, this);
            }
        });
    }

    $scope.updatePref= function(studioId, index){
        var allPrefs = [];
        var vals = Object.keys($scope.choosenPrefs).map(function (key) {
            return $scope.choosenPrefs[key]
        });
        
        if (vals.indexOf(studioId) != -1){
            delete $scope.choosenPrefs[index+1];
            delete $scope.general.studio[index];
            alert('Choosing the same studio is not allowed. please choose each studio only one time.');
            
        }
        
        $scope.choosenPrefs[index+1] = studioId;
        
    }
    
    $scope.IsInPref = function(stud){
        return true;
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
            $scope.getStudios();
            $scope.doneUpdate = true;
        });
    }

    $scope.insertPreferences = function(){
        angular.forEach($scope.choosenPrefs,function(value,key){
            var pref = new Preferences({
                Id: $scope.student.id,
                IdS: $scope.choosenPrefs[key],
                IdR: $scope.registration,
                StudentYear: $scope.currentyear,
                Semester: $scope.semester,
                Rate : key
            });

            pref.$save(function(response) {
                $scope.doneInsert = true;
                $scope.message = "Preferences saved successfully!";
            });
        });         

    }

    $scope.checkReg();
    $scope.findOne();

}]);


