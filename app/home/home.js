angular.module('empatica')

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            template: '<home-page></home-page>'
        });
    })
    .component('homePage', {
        templateUrl: 'home/home.html',
        controller: function homeController(userService) {

            const $ctrl = this;

            let id;
            $ctrl.$onInit = () =>
                userService.login().then(userId => {
                    console.log(userId);
                    userService.getUser(id).then(user => console.log(user));
                    userService.getUserOrders(id).then(user => console.log(user));
                });
        }
    });