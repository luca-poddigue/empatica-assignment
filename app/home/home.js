angular.module('empatica')

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            template: '<home-page></home-page>'
        });
    })
    .component('homePage', {
        templateUrl: 'home/home.html',
        controller: function homeController() {
        }
    });