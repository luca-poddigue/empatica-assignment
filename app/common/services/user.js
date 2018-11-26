angular
    .module('empatica')
    .factory('userService', function userFactory($http) {

        const backendServerUrl = 'http://localhost:3000';

        const getDataFromResponse = response => response.data;

        function login() {
            return $http({
                method: 'POST',
                url: backendServerUrl + '/login'
            }).then(getDataFromResponse);
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
            getUser: userId => getUser(userId),
            getUserOrders: userId => getUserOrders(userId),
            deleteUserOrder: orderId => deleteUserOrder(orderId)
        };

    });