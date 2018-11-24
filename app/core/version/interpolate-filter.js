'use strict';

angular.module('myApp.version.interpolate-filter', [])

    .filter('interpolate', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    });
