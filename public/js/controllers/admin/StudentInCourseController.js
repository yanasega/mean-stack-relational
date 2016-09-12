angular.module('mean.system').controller('StudentInCourseController', ['$scope', '$resource' ,'Global', 'StudentInCourses','Courses','$window',function ($scope, $resource ,Global ,StudentInCourses ,Courses,$window) {
    console.log("StudentInCourseController");
    $scope.global = Global;
    $scope.showcourse = true;    
// angular.module("mainModule", [])
//   .controller("mainController", function ($scope)
//   {
//     // Initialization
//     $scope.areAllPeopleSelected = false;

//     $scope.people = [
//       {Id_c: "1", Name: "A", CreditPoints: "3"},
//       {Id_c: "2", Name: "B", CreditPoints: "4"}
//     ];

//     $scope.selectablePeople = [
//     {Id_c: "1", Name: "A", CreditPoints: "3", isSelected: false},
//       {Id_c: "2", Name: "B", CreditPoints: "4", isSelected: false}
//     ];

//     $scope.stringsArray = [];
//     var currStringIndex = 0;

//     // Utility functions
//     $scope.updatePeopleSelection = function (peopleArray, selectionValue) {
//       for (var i = 0; i < peopleArray.length; i++)
//       {
//         peopleArray[i].isSelected = selectionValue;
//       }
//     };

//     // $scope.getPersonPositionDesc = function(isFirst, isMiddle, isLast, isEven, isOdd) {
//     //   var result = "";

//     //   if (isFirst)
//     //   {
//     //     result = "(first";
//     //   }
//     //   else if (isMiddle)
//     //   {
//     //     result = "(middle";
//     //   }
//     //   else if (isLast)
//     //   {
//     //     result = "(last";
//     //   }

//     //   if (isEven)
//     //   {
//     //     result += "-even)";
//     //   }
//     //   else if (isOdd)
//     //   {
//     //     result += "-odd)";
//     //   }

//     //   return result;
//     // };

//     // $scope.addStringToArray = function () {
//     //   $scope.stringsArray.push("Item " + currStringIndex);
//     //   currStringIndex++;
//     // };

//     // $scope.removeStringFromArray = function (stringIndex) {
//     //   if (stringIndex >= 0 && stringIndex < $scope.stringsArray.length)
//     //   {
//     //     $scope.stringsArray.splice(stringIndex, 1);
//     //   }
//     // };
//   //  });
//     $scope.addCourse = function() {
//         var course = new StudentInCourses({
// 			Id_c: $scope.id,
//             Name: $scope.name,
// 			CreditPoints: $scope.creditpoints
//         });
//         course.$save(function(response) {
//             $scope.find();
//             //yana: add check if response valid?
//         });
//         $scope.clear();
//     };

     $scope.find = function() {
        Courses.query(function(courses) {
            // console.log(courses);
            $scope.courses = courses; //yana: check if data relavent?
            $scope.showcourse = true;
        });
    };

//     $scope.remove = function(course) {
//         if (course) {
//             course.$remove();  

//             for (var i in $scope.courses) {
//                 if ($scope.courses[i] === course) {
//                     $scope.courses.splice(i, 1);
//                 }
//             }
//         }
//         else {
//             $scope.course.$remove();
//             $state.go('courses'); //yana: test
//         }
//         $scope.clear();
//     };

//     $scope.clear = function(){
//         $scope.id = null;
//         $scope.name = null;
//         $scope.creditpoints = null;
//         // $scope.ismandatory = null;
//     };

//     // $scope.filterYearOptions = {
//     //     stores: [
//     //     {id : 2, name : 'Filter by year...', years: 'Filter by year...' },
//     //     {id : 3, name : '3rd-4th', years: '3rd-4th' },
//     //     {id : 4, name : '5th', years: '5th' }
//     //     ]
//     // };

//     // $scope.filterYear = {
//     //     store: $scope.filterYearOptions.stores[0]
//     // }

//     // $scope.yearFilter = function (data) {
//     //     if (data.Relevant_years === $scope.filterYear.store.years) {
//     //         return true;
//     //     } else if ($scope.filterYear.store.years === 'Filter by year...') {
//     //         return true;
//     //     } else {
//     //         return false;
//     //     }
//     // }; 

//     // $scope.filterSemesterOptions = {
//     //     stores: [
//     //     {id : 2, name : 'Filter by semester...', semesters: 'Filter by semester...' },
//     //     {id : 3, name : 'Winter', semesters: 'Winter' },
//     //     {id : 4, name : 'Spring', semesters: 'Spring' }
//     //     ]
//     // };

//     // $scope.filterSemester = {
//     //     store: $scope.filterSemesterOptions.stores[0]
//     // }

//     // $scope.semesterFilter = function (data) {
//     //     if (data.Semester === $scope.filterSemester.store.semesters) {
//     //         return true;
//     //     } else if ($scope.filterSemester.store.semesters === 'Filter by semester...') {
//     //         return true;
//     //     } else {
//     //         return false;
//     //     }
//     // }; 

    $scope.find();
    
// $(document).ready(function (){
//    var table = $('#example').DataTable({
//       'ajax': '/lab/jquery-datatables-checkboxes/ids-arrays.txt',
//       'columnDefs': [
//          {
//             'targets': 0,
//             'checkboxes': {
//                'selectRow': true
//             }
//          }
//       ],
//       'select': {
//          'style': 'multi'
//       },
//       'order': [[1, 'asc']]
//    });


//    // Handle form submission event 
//    $('#frm-example').on('submit', function(e){
//       var form = this;
      
//       var rows_selected = table.column(0).checkboxes.selected();

//       // Iterate over all selected checkboxes
//       $.each(rows_selected, function(index, rowId){
//          // Create a hidden element 
//          $(form).append(
//              $('<input>')
//                 .attr('type', 'hidden')
//                 .attr('name', 'id[]')
//                 .val(rowId)
//          );
//       });
//    });
// });



}]);