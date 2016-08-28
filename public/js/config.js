//Setting up route
angular.module('mean').config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise(function($injector, $location){
        $injector.invoke(['$state', function($state) {
            $state.go('404');
        }]);
    });
    $stateProvider
        // .state('home',{
        //     url : '/',
        //     controller : 'IndexController',
        //     templateUrl: 'views/index.html'
        // })
        .state('home',{
            url : '/',
            templateUrl: 'views/users/signin.html'
        })
        .state('SignIn',{
            url : '/signin',
            templateUrl: 'views/users/signin.html'
        })
        .state('SignUp',{
            url : '/signup',
            templateUrl: 'views/users/signup.html'
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
        .state('UpStud',{
            url : '/uploadstudents',
            controller : 'StudentsController',
            templateUrl: 'views/admin/UploadStudents.html'
        })
        .state('ViewStudio',{
            url : '/viewstudios',
            controller : 'StudioController',
            templateUrl: 'views/admin/ViewStudios.html'
        })
        .state('ViewCourse',{
            url : '/viewcourses',
            controller : 'CourseController',
            templateUrl: 'views/admin/ViewCourses.html'
        })
        .state('InsertPref',{
            url : '/insertpreferences',
            controller : 'InsertPreferencesController',
            templateUrl: 'views/users/InsertPreferences.html'
<<<<<<< HEAD
        .state('DegCalc',{
            url : '/degreecalculator',
            controller : 'GradeInCourseController',
            templateUrl: 'views/users/GradeInCourse.html'
        })
        .state('SignUp',{
            url : '/signup',
            templateUrl: 'views/users/signup.html'
=======

>>>>>>> origin/development
        })
        .state('articles',{
            url : '/articles',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/list.html'
        })
        .state('createArticle',{
            url : '/articles/create',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/create.html'
        })
        .state('editArticles',{
            url : '/articles/{articleId}/edit',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/edit.html'
        })
        .state('viewArticle',{
            url : '/articles/{articleId}',
            controller : 'ArticlesController',
            templateUrl: 'views/articles/view.html'
        })
        .state('404',{
            templateUrl: 'views/404.html'
        })
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);

}]);