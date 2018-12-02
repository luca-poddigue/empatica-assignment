angular
    .module('empatica')
    /**
     * A collection of helper functions to detect if the current browser supports a given feature.
     */
    .factory('featureHelperService', function featureHelperFactory() {

        /**
         * Determines if svg images are supported by the current browser.
         * @returns {boolean} true if svg images are supported, false otherwise.
         */
        function svg() {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
        }

        return {
            svg: () => svg(),
        };

    });