angular.module('empatica')
    .config(function ($routeProvider) {
        $routeProvider.when('/profile', {
            template: '<profile-page></profile-page>'
        });
    })
    .component('profilePage', {
        templateUrl: 'profile/profile.html',
        controller: function profileController(userService, $location) {

            const $ctrl = this;

            $ctrl.$onInit = () => {
                if (!userService.userLoggedIn()) {
                    $location.url('/');
                    return;
                }
                userService.getUser().then(function (user) {
                    $ctrl.user = user;
                });
                userService.getUserOrders().then(function (orders) {
                    $ctrl.orders = orders;
                });
            };
        }
    });