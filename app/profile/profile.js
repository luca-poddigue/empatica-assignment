angular.module('empatica')
    .config(function ($routeProvider) {
        $routeProvider.when('/profile', {
            template: '<profile-page></profile-page>'
        });
    })
    .component('profilePage', {
        templateUrl: 'profile/profile.html',
        controller: function profileController() {
        }
    });