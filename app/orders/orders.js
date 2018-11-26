angular.module('empatica')

    .config(function ($routeProvider) {
        $routeProvider.when('/orders', {
            template: '<orders-page></orders-page>'
        });
    })
    .component('ordersPage', {
        templateUrl: 'orders/orders.html',
        controller: function ordersController() {
        }
    });