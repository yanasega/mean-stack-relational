angular.module('mean.system').controller('CreateNewAssignmentController', ['$scope', '$resource','Global', '$window','Students','Studios',function ($scope, $resource,Global,$window,Students,Studios) {
    console.log("CreateNewAssignmentController");
    $scope.global = Global;
    $scope.showreg = false;
    $scope.count34 = 0;
    $scope.count5 = 0;
    $scope.status = null;
    $scope.models = {
        selected: null,
        listsA34: [],
        listsA5:[],
        listsB34: [],
        listsB5: [],
        studio34: [],
        studio5: [],

    };
    // $scope.Sdata = {
    //    count = 0,
    //     Male = 0,
    //     female= 0,
    //     GAvarage= 0,
    //     SAvarage= 0
    // };

    $scope.init = function(){
       $scope.find();
       // console.log($scope.createnewassignment);
        
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

    // on load set lists of info
        Students.query(function(students) {
           $scope.students = students; 
           students.forEach(function(student) {
            if(student.currentyear =='3rd'|| student.currentyear =='4th'){ 
                $scope.models.listsB34.push({student});
                $scope.count34 += 1;
            }   
             if(student.currentyear =='5th'){
                $scope.models.listsB5.push({student});
                $scope.count5 += 1;
            }
           }, this);
       })
           Studios.query(function(studios) {
           $scope.studios = studios; 
          
            studios.forEach(function(studio) {
                //  if(studio.IsActive == true){ 
                     if(studio.Relevant_years == '3rd-4th'){   
                         $scope.models.studio34.push({studio});
                         $scope.models.listsA34.push([]);
                        // //  for(i=0; i<$scope.count34; ++i){
                        // //  $scope.models.listsA34.list.push({});
                        // //  }  
                      
                     }
                      if(studio.Relevant_years == '5th'){
                         
                         $scope.models.studio5.push({studio});
                         $scope.models.listsA5.push([]);
                        //  listsA5.forEach(function(list) {
                        // //  for(i=0; i<$scope.count5; ++i){
                        // //  $scope.models.listsA5.list.push({});
                        // //  }  
                        //  }, this);
                     }
     
                 
              })
                console.log($scope.models.listsA34);
                    console.log($scope.models.listsA5);
                     $scope.models.listsA34.forEach(function(list) {
                            for(i=0; i<$scope.count34; ++i){
                             console.log(i);
                             list.push({});
                             console.log(list);
                        }
                     }, this);
                     
                       $scope.models.listsA5.forEach(function(list) {
                         console.log(333);
                            for(i=0; i<$scope.count5; ++i){
                            console.log(i);
                             list.push({});
                        }
                     }, this);
              })     
       

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


