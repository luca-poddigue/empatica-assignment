describe('user service', () => {

    const backendServerUrl = 'http://backendServerUrl:1234';
    const userId = 123;

    let userService;
    let $httpBackend;

    beforeEach(module('empatica'));

    beforeEach(module(function ($provide) {
        $provide.constant('backendServerUrl', backendServerUrl);
    }));

    beforeEach(inject((_$compile_, _$rootScope_, _userService_, _$httpBackend_, _localStorageService_) => {
        localStorageService = _localStorageService_;
        spyOn(localStorageService, 'set');
        spyOn(localStorageService, 'remove');

        userService = _userService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('login', () => {
        it('should call the backend to get the user id and store it into local storage', () => {

            $httpBackend.whenPOST(backendServerUrl + '/login').respond({"id": userId});
            userService.login();
            $httpBackend.flush();
            expect(localStorageService.set).toHaveBeenCalledWith('user', {
                id: userId
            });
        });
    });

    describe('logout', () => {
        it('should remove the user id from local storage', () => {
            userService.logout();
            expect(localStorageService.remove).toHaveBeenCalledWith('user');
        });
    });

    describe('userLoggedIn', () => {
        it('should return true if the user is logged in', () => {
            spyOn(localStorageService, 'get').and.returnValue({id: userId});
            expect(userService.userLoggedIn()).toBe(true);
            expect(localStorageService.get).toHaveBeenCalledWith('user');
        });

        it('should return false if the user is not logged in', () => {
            spyOn(localStorageService, 'get');
            expect(userService.userLoggedIn()).toBe(false);
            expect(localStorageService.get).toHaveBeenCalledWith('user');
        });
    });

    describe('getUser', () => {
        it('should throw an exception if the user is not logged in', () => {
            expect(userService.getUser).toThrow(new Error("User not logged in."));
        });

        it('should call the backend server to get the details for the user', () => {
            spyOn(localStorageService, 'get').and.returnValue({id: userId});

            const userDetails = {"id": 1, "firstName": "John", "lastName": "Doe", "email": "john@doe.com"};
            $httpBackend.whenGET(backendServerUrl + '/users/' + userId).respond(userDetails);

            let response;
            userService.getUser().then((_response_ => {
                response = _response_;
            }));
            $httpBackend.flush();
            expect(response).toEqual(userDetails);
        });
    });

    describe('getUserOrders', () => {
        it('should throw an exception if the user is not logged in', () => {
            expect(userService.getUserOrders).toThrow(new Error("User not logged in."));
        });

        it('should call the backend server to get the user orders', () => {
            spyOn(localStorageService, 'get').and.returnValue({id: userId});

            const userOrders = {
                "orders": [{"id": 1, "ref": "#ord-2018-a993bee3"}, {
                    "id": 2,
                    "ref": "#ord-2018-a993bee5"
                }]
            };
            $httpBackend.whenGET(backendServerUrl + '/users/' + userId + '/orders').respond(userOrders);

            let response;
            userService.getUserOrders().then((_response_ => {
                response = _response_;
            }));
            $httpBackend.flush();
            expect(response).toEqual(userOrders.orders);
        });
    });

    describe('cancelUserOrder', () => {
        it('should call the backend to delete the order', () => {
            const orderId = 1;
            const cancelledOrder = {
                "orderId": 1,
                "status": "cancelled",
                "order": {"id": 1, "ref": "#ord-2018-a993bee3"}
            };
            $httpBackend.whenDELETE(backendServerUrl + '/orders/' + orderId).respond(cancelledOrder);

            let response;
            userService.cancelUserOrder(orderId).then((_response_ => {
                response = _response_;
            }));
            $httpBackend.flush();
            expect(response).toEqual(cancelledOrder);
        });
    });
});