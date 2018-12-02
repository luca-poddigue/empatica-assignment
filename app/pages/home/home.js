angular.module('empatica')

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            template: '<home-page></home-page>'
        });
    })
    .component('homePage', {
        templateUrl: 'pages/home/home.html',
        controller: function homeController(featureHelperService) {

            const $ctrl = this;

            $ctrl.svgSupported = () => featureHelperService.svg();

        }
    });