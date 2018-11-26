'use strict';

angular.module('empatica', [
    'pascalprecht.translate',
    'ngRoute'
]).config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.otherwise({redirectTo: '/'});
});
