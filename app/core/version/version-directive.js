'use strict';

angular.module('myApp.version.version-directive', [])

    .directive('appVersion', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    });
