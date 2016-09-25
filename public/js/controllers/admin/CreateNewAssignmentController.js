angular.module('mean.system').controller('CreateNewAssignmentController', ['$scope', '$resource','Global', '$window','Students','Studios',function ($scope, $resource,Global,$window,Students,Studios) {
    console.log("CreateNewAssignmentController");
    $scope.global = Global;
    $scope.showreg = false;
    $scope.count34 = 0;
    $scope.count5 = 0;
    $scope.status = null;
    $scope.studios = [];

    $scope.models = {
        studioLists : {},
        selected: null
    };

    $scope.init = function (){
        Students.query(function(students) {
            $scope.models.studioLists[0] = [];
            students.forEach(function(student) {
                if ($scope.ChosenYear == "3rd-4th"){
                    if (student.CurrentYear =='3'|| student.CurrentYear =='4'){
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else if ($scope.ChosenYear == "5th"){
                    if (student.CurrentYear =='5'){
                        $scope.models.studioLists[0].push(student);
                    }
                }
                else{
                    $scope.models.studioLists = {};
                }
            }, this);
        });

        Studios.query(function(studios){
            studios.forEach(function(studio) {
                if ($scope.ChosenYear == "3rd-4th"){
                    if (studio.RelevantYears == '3,4'){
                        $scope.studios.push(studio);
                        $scope.models.studioLists[studio.id] = [[],[],[],[],[],[],[],[],[],[],[]];
                    }
                }
                else if($scope.ChosenYear == "5th"){
                     if (studio.RelevantYears == '5'){
                        $scope.models.studioLists[studio.id] = [];
                    }                   
                }
                else{
                    $scope.models.studioLists = {};
                }
            }, this);
        });
    }

   //default value for drop down list
    $scope.year = ["choose year..","3rd-4th", "5th"];
    $scope.ChosenYear = "choose year..";
    $scope.ChosenSemester = "choose Semester ..";

    // Generate initial model
    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

    // // on load set lists of info
    // Students.query(function(students) {
    //        $scope.students = students; 
    //        students.forEach(function(student) {
    //         if(student.CurrentYear =='3'|| student.CurrentYear =='4'){ 
    //             $scope.models.listsB34.push({student});
    //             $scope.count34 += 1;
    //         }   
    //         else {
    //             $scope.models.listsB5.push({student});
    //             $scope.count5 += 1;
    //         }
    //        }, this);
    // })
    // Studios.query(function(studios) {
    //        $scope.studios = studios; 
    //       console.log($scope.studios);
    //         studios.forEach(function(studio) {
    //             //  if(studio.IsActive == true){ 
    //                  if(studio.RelevantYears == '3,4'){   
    //                      $scope.models.studio34.push({studio});
    //                      $scope.models.listsA34.push(studio);
    //                     // //  for(i=0; i<$scope.count34; ++i){
    //                     // //  $scope.models.listsA34.list.push({});
    //                     // //  }  
                      
    //                  }
    //                   else{
                         
    //                      $scope.models.studio5.push({studio});
    //                      $scope.models.listsA5.push(studio);
    //                     //  listsA5.forEach(function(list) {
    //                     // //  for(i=0; i<$scope.count5; ++i){
    //                     // //  $scope.models.listsA5.list.push({});
    //                     // //  }  
    //                     //  }, this);
    //                  }
     
                 
    //           })
    //             // console.log($scope.models.listsA34);
    //             //     // console.log($scope.models.listsA5);
    //             //      $scope.models.listsA34.forEach(function(list) {
    //             //             for(i=0; i<$scope.count34; ++i){
    //             //             //  console.log(i);
    //             //              list.push({});
    //             //             //  console.log(list);
    //             //         }
    //             //      }, this);
                     
    //             //        $scope.models.listsA5.forEach(function(list) {
    //             //          console.log(333);
    //             //             for(i=0; i<$scope.count5; ++i){
    //             //             console.log(i);
    //             //              list.push({});
    //             //         }
    //             //      }, this);
    // })     
       

    $scope.uploadData = function(){
        
    }

    // $scope.UpdateStudentsData = function(){
    //     $scope.count = 0,
    //     $scope.Male = 0,
    //     $scope.female= 0,
    //     $scope.GAvarage= 0,
    //     $scope.SAvarage= 0
    //   $scope.models.listsA34.forEach(function(list) {
    //      list.forEach(function(item) {
    //        $scope.count +=1;
    //        $scope.GAvarage += item.GeneralAvarage;
    //        $scope.SAvarage += item.LastStudioGrade;
    //        if(item.Gender == 'female')
    //        {
    //         $scope.female +=1;
    //        }  
    //        else{
    //        $scope.Male+=1;
    //        }
    //      }, this);
    //  }, this);
    // }
    

}]);


