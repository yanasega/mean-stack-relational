//Setting up route
angular.module('mean').config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise(function($injector, $location){
        $injector.invoke(['$state', function($state) {
            $state.go('404');
        }]);
    });
    $stateProvider
        .state('home',{
            url : '/',
            templateUrl: 'views/users/signin.html'
        })
        .state('userhome',{
            url : '/home',
            controller: 'HomeController',
            templateUrl: 'views/users/HomePage.html'
        })
         .state('adminhome',{
            url : '/adminhome',
            controller: 'AdminHomeController',
            templateUrl: 'views/users/AdminHomePage.html'
        })
        .state('SignIn',{
            url : '/signin',
            templateUrl: 'views/users/signin.html'
        })
        .state('ViewPdf',{
            url : '/uploads/:pdfId'
        })
        .state('SignUp',{
            url : '/signup',
            templateUrl: 'views/users/signup.html'
        })
        .state('ViewDetails',{
            url : '/viewdetails',
            controller : 'ViewDetailsController',
            templateUrl: 'views/users/ViewDetails.html'
        })
        .state('OpenReg',{
            url : '/openregistration',
            controller : 'RegistrationController',
            templateUrl: 'views/admin/OpenRegistration.html'
        })
        .state('ViewReg',{
            url : '/viewregistration',
            controller : 'RegistrationController',
            templateUrl: 'views/admin/ViewRegistration.html'
        })
        .state('editReg',{
            url : '/registrations/{registrationId}/edit',
            controller : 'RegistrationController',
            templateUrl: 'views/admin/EditRegistration.html'
        })
        .state('ViewStud',{
            url : '/viewstudents',
            controller : 'StudentsController',
            templateUrl: 'views/admin/ViewStudents.html'
        })
        .state('StudentInfo',{
            url : '/viewstudents/{studentId}',
            controller : 'StudentsController',
            templateUrl: 'views/admin/StudentInfo.html'
        })
        .state('UpStud',{
            url : '/uploadstudents',
            controller : 'StudentsController',
            templateUrl: 'views/admin/UploadStudents.html'
        })
        .state('editStudent',{
            url : '/students/{studentId}/edit',
            controller : 'StudentsController',
            templateUrl: 'views/admin/EditStudent.html'
        })
        .state('ViewStudio',{
            url : '/viewstudios',
            controller : 'StudioController',
            templateUrl: 'views/admin/ViewStudios.html'
        })
        .state('editStudio',{
            url : '/studios/{studioId}/edit',
            controller : 'StudioController',
            templateUrl: 'views/admin/EditStudio.html'
        })
        .state('editCourse',{
            url : '/courses/{courseId}/edit',
            controller : 'CourseController',
            templateUrl: 'views/admin/EditCourse.html'
        })
        .state('ViewInstr',{
            url : '/ViewInstructors',
            controller : 'InstructorController',
            templateUrl: 'views/admin/ViewInstructors.html'
        })
        .state('ViewSubj',{
            url : '/ViewSubjects',
            controller : 'SubjectController',
            templateUrl: 'views/admin/ViewSubjects.html'
        })          
        .state('ViewCourse',{
            url : '/viewcourses',
            controller : 'CourseController',
            templateUrl: 'views/admin/ViewCourses.html'
        })
        .state('StudCourse',{
            url : '/viewstudentincourse',
            controller : 'StudentInCourseController',
            templateUrl: 'views/users/StudentInCourse.html'
        })
        .state('InsertPref',{
            url : '/insertpreferences',
            controller : 'InsertPreferencesController',
            templateUrl: 'views/users/InsertPreferences.html'
        })
        .state('ViewPref',{
            url : '/viewpreferences',
            controller : 'ViewPreferencesController',
            templateUrl: 'views/users/ViewPreferences.html'
        })
        .state('ViewAssignments',{
            url : '/viewstudentassignments',
            controller : 'ViewAssignmentsController',
            templateUrl: 'views/users/ViewStudentAssignments.html'
        })
        .state('articles',{
            url : '/articles',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/list.html'
        })
        // .state('createArticle',{
        //     url : '/articles/create',
        //     controller : 'ArticlesController',
        //     templateUrl: 'views/articles/create.html'
        // })
        // .state('editArticles',{
        //     url : '/articles/{articleId}/edit',
        //     controller : 'ArticlesController',
        //     templateUrl: 'views/articles/edit.html'
        // })
        // .state('viewArticle',{
        //     url : '/articles/{articleId}',
        //     controller : 'ArticlesController',
        //     temsplateUrl: 'views/articles/view.html'
        // })
        .state('CreateNewAssignment',{
            url : '/CreateNewAssignment',
            controller : 'CreateNewAssignmentController',
            templateUrl: 'views/admin/CreateNewAssignment.html'
        })
        .state('ViewPreviousAssignment',{
            url : '/ViewPreviousAssignment',
            controller : 'CreateNewAssignmentController',
            templateUrl: 'views/admin/ViewPreviousAssignment.html'
        })
        .state('editAssignment',{
            url : '/assignments/{assignmentId}/edit',
            controller : 'CreateNewAssignmentController',
            templateUrl: 'views/admin/EditAssignment.html'
        })
         .state('viewFullAssignment',{
            url : '/assignments/{assignmentId}/view',
            controller : 'CreateNewAssignmentController',
            templateUrl: 'views/admin/ViewFullAssignment.html'
        })
        .state('ViewSylab',{
            url : '/ViewSylabuses',
            controller : 'ViewSylabusesController',
            templateUrl: 'views/users/ViewSylabuses.html'
        })
        .state('404',{
            templateUrl: 'views/404.html'
        })
        .state('401',{
            templateUrl: 'views/401.html'
        })
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);

}]);