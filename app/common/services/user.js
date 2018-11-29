angular
    .module('empatica')
    /**
     * Exposes all the actions related to the app user.
     */
    .factory('userService', function userFactory($http, localStorageService, $exceptionHandler) {

        const backendServerUrl = 'http://localhost:3000';

        /**
         * Extracts the payload from the response object to an http request.
         * @param response The response to the http request.
         * @returns {object} The response payload.
         */
        const getDataFromResponse = response => response.data;

        /**
         * Performs the login for the user. The response is an object defining the user, which is persisted into the browser local storage to maintain its authentication status. The response object defining the user This should be considered a mock. In a real setting, credentials would be required and the backend would also return an auth token for the user.
         * @returns {Promise<object>} The user object.
         */
        function login() {
            return $http({
                method: 'POST',
                url: backendServerUrl + '/login'
            }).then(getDataFromResponse)
                .then((user) => {
                        localStorageService.set('user', {
                            id: user.id
                        });
                        return user;
                    }
                );
        }

        /**
         * Performs the logout for the user. This is achieved by deleting the user object from the browser local storage.
         */
        function logout() {
            localStorageService.remove("user");
        }

        /**
         * Determines if the user is currently logged in.
         * @returns {boolean} true if the user is logged in, false otherwise.
         */
        function userLoggedIn() {
            return !!localStorageService.get('user');
        }

        /**
         * Retrieves the personal details of the current user.
         * @returns {Promise<object>} The user personal details.
         */
        function getUser() {
            const user = localStorageService.get('user');
            if (!user) {
                $exceptionHandler(new Error("User not logged in."));
            }
            return $http({
                method: 'GET',
                url: backendServerUrl + '/users/' + user.id
            }).then(getDataFromResponse);
        }

        /**
         * Retrieves the orders of the current user.
         * @returns {Promise<array>} The list of user orders.
         */
        function getUserOrders() {
            const user = localStorageService.get('user');
            return $http({
                method: 'GET',
                url: backendServerUrl + '/users/' + user.id + '/orders'
            }).then(getDataFromResponse)
                .then(data => data.orders);
        }

        /**
         * Deletes the order identified by the order id.
         * @param orderId The id of the order.
         * @returns {Promise<object>} The deleted order.
         */
        function cancelUserOrder(orderId) {
            return $http({
                method: 'DELETE',
                url: backendServerUrl + '/orders/' + orderId
            }).then(getDataFromResponse);
        }

        return {
            login: () => login(),
            logout: () => logout(),
            userLoggedIn: () => userLoggedIn(),
            getUser: () => getUser(),
            getUserOrders: () => getUserOrders(),
            cancelUserOrder: orderId => cancelUserOrder(orderId)
        };

    });