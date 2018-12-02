/**
 * Renders the main structure of the app. It contains and accounts for the nav bar at the page top, the footer and the placeholder for the actual page content to be filled based on the active route.
 */
angular.module('empatica')
    .component('mainView', {
        templateUrl: 'common/components/main-view/main-view.html',
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