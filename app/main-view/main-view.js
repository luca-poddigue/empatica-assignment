angular.module('empatica')
    .component('mainView', {
        templateUrl: 'main-view/main-view.html',
        controller: function mainViewController(userService, $location) {

            const $ctrl = this;

            $ctrl.login = () => userService.login();
            $ctrl.logout = () => {
                userService.logout();
                $location.url('/');
            };
            $ctrl.userLoggedIn = () => userService.userLoggedIn();
            $ctrl.isHomePage = () => $location.path() === '/';
            $ctrl.isCurrentPage = (linkPath) => $location.path() === linkPath;
        }
    });