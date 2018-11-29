angular.module('empatica', [
    'pascalprecht.translate',
    'ngRoute',
    'ngSanitize',
    'LocalStorageModule',
    'ngAnimate'
]).config(function ($locationProvider, $routeProvider, localStorageServiceProvider) {
    $locationProvider.html5Mode(true);
    localStorageServiceProvider.setPrefix('empatica_');

    $routeProvider.otherwise({redirectTo: '/'});
});
