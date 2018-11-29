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
                $ctrl.userPromise = userService.getUser().then(function (user) {
                    $ctrl.user = user;
                });
                $ctrl.userOrdersPromise = userService.getUserOrders().then(function (orders) {
                    $ctrl.orders = orders;
                });
            };

            /**
             * Method bound to each order component to respond to an order cancellation. It removes the cancelled ordered from the list. The list is modified locally, without fetching again the full list from the backend.
             * @param orderIndex The index of the cancelled order in the orders list.
             */
            $ctrl.onOrderCancelled = (orderIndex) => {
                $ctrl.orders.splice(orderIndex, 1);
            }
        }
    });