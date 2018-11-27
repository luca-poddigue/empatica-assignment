angular.module('empatica')
    .component('mainView', {
        templateUrl: 'main-view/main-view.html',
        controller: function mainViewController(userService) {

            const $ctrl = this;

            $ctrl.login = () => userService.login();
            $ctrl.logout = () => userService.logout();
            $ctrl.userLoggedIn = () => userService.userLoggedIn();
        }
    });