'use strict';

angular.module('empatica').directive('mfSrc', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attr) {

            const browserSupportsSvg = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
            attr.$observe('mfSrc', function (mfSrc) {
                if (angular.isString(mfSrc)) {
                    attr.$set('src', mfSrc + (browserSupportsSvg ? '.svg' : ('.' + (attr.format || 'png'))));
                } else {
                    elm.removeAttr('src');
                }


            });
        }
    };
});
