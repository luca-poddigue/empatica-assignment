module.exports = function (config) {
    config.set({
        basePath: './app',
        preprocessors: {
            '**/*.html': ['ng-html2js'],
            '*!(*spec).js': ['coverage'],
            'common/**/!(*spec).js': ['coverage'],
            'pages/**/!(*spec).js': ['coverage']
        },
        reporters: ['coverage'],
        coverageReporter: {
            type: 'cobertura',
            dir: 'coverage/'
        },
        files: [
            '../node_modules/jquery/dist/jquery.min.js',
            'lib/angular/angular.min.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            'lib/angular-route/angular-route.min.js',
            'lib/angular-translate/dist/angular-translate.min.js',
            'lib/angular-sanitize/angular-sanitize.min.js',
            'lib/angular-animate/angular-animate.min.js',
            'lib/angular-local-storage/dist/angular-local-storage.min.js',
            '*.js',
            'common/**/*.js',
            'pages/**/*.js',
            'common/**/*.html',
            'pages/**/*.html',
        ],
        autoWatch: false,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-coverage'
        ],
        ngHtml2JsPreprocessor: {
            moduleName: 'empatica'
        },

    });
};
