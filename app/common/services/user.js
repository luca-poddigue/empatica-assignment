angular
    .module('empatica')
    .factory('userService', function userFactory($http, $location, localStorageService) {

        const backendServerUrl = 'http://localhost:3000';

        const getDataFromResponse = response => response.data;

        function login() {
            return $http({
                method: 'POST',
                url: backendServerUrl + '/login'
            }).then(function (response) {
                // In a real setting, the backend would also return an auth token for the user.
                localStorageService.set('user', {
                    userId: response.data
                });
            });
        }

        function logout() {
            localStorageService.remove("user");
            $location().url('/');
        }

        function userLoggedIn() {
            return !!localStorageService.get('user');
        }

        function getUser(userId) {
            return $http({
                method: 'GET',
                url: backendServerUrl + '/users/' + userId
            }).then(getDataFromResponse);
        }

        function getUserOrders(userId) {
            return $http({
                method: 'GET',
                url: backendServerUrl + '/users/' + userId + '/orders'
            }).then(getDataFromResponse);
        }

        function deleteUserOrder(orderId) {
            return $http({
                method: 'GET',
                url: backendServerUrl + '/orders/' + orderId
            });
        }

        return {
            login: () => login(),
            logout: () => logout(),
            userLoggedIn: () => userLoggedIn(),
            getUser: userId => getUser(userId),
            getUserOrders: userId => getUserOrders(userId),
            deleteUserOrder: orderId => deleteUserOrder(orderId)
        };

    });