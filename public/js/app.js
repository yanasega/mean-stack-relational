angular.module('mean', ['ngCookies', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles', 'mean.auth','ngFileUpload']);

angular.module('mean.system', ['ngFileUpload']);
angular.module('mean.articles', []);
//angular.module('mean.registrations', []); //yana:maybe create one?
angular.module('mean.auth', []);