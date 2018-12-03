describe('profile page', function () {

    let profilePage;
    let userService;
    let $location;
    let $q;
    let scope;

    const userDetails = {"id": 1, "firstName": "John", "lastName": "Doe", "email": "john@doe.com"};
    const userOrders = [{
        "id": 1,
        "ref": "#ord-2018-a993bee3",
        "status": "paid",
        "tracking": {"carrier": "UPS", "trackingCode": "DAJA91930102NDAKKS0", "status": "in_transit"},
        "items": [{"sku": "emb-mb-s", "name": "Embrace Watch - Stretchable Band Black", "amount": 249}],
        "discounts": [{"name": "Christmas 2018 - 10% OFF", "type": "percent", "value": 10}]
    }, {
        "id": 2,
        "ref": "#ord-2018-b6012cc8",
        "status": "paid",
        "tracking": null,
        "items": [{
            "sku": "emb-bb-s",
            "name": "Embrace Watch - Stretchable Band Blue",
            "amount": 249
        }, {"sku": "emb-mb-s", "name": "Embrace Watch - Stretchable Band Black", "amount": 249}],
        "discounts": [{"name": "2x1 Embrace", "type": "amount", "value": 249}]
    }];

    beforeEach(module('empatica'));

    beforeEach(inject((_$compile_, _$rootScope_, _userService_, _$location_, _$q_) => {
        userService = _userService_;
        $q = _$q_;
        $location = _$location_;
        scope = _$rootScope_.$new();
        profilePage = _$compile_('<profile-page></profile-page>')(scope);
    }));

    it('should redirect to the home page if the user is not logged in', function () {
        spyOn(userService, 'userLoggedIn').and.returnValue(false);
        spyOn($location, 'url');
        scope.$digest();
        expect($location.url).toHaveBeenCalledWith('/');
    });

    it('should load and display the user details', function () {
        spyOn(userService, 'userLoggedIn').and.returnValue(true);
        spyOn(userService, 'getUserOrders').and.returnValue($q.resolve());
        spyOn(userService, 'getUser').and.returnValue($q.resolve(userDetails));
        scope.$digest();
        expect(profilePage.find('#name h2').text()).toBe('John Doe');
        expect(profilePage.find('#email h2').text()).toBe('john@doe.com');
    });

    it('should display a loading spinner until user details are loaded', function () {
        const deferred = $q.defer();
        spyOn(userService, 'userLoggedIn').and.returnValue(true);
        spyOn(userService, 'getUserOrders').and.returnValue($q.resolve());
        spyOn(userService, 'getUser').and.returnValue(deferred.promise);
        scope.$digest();
        expect(profilePage.find('#user-spinner > div').css('display')).toBe('block');
        deferred.resolve(userDetails);
        scope.$digest();
        expect(profilePage.find('#user-spinner > div').css('display')).toBe('none');
    });

    it('should load and display the user orders', function () {
        spyOn(userService, 'userLoggedIn').and.returnValue(true);
        spyOn(userService, 'getUserOrders').and.returnValue($q.resolve(userOrders));
        spyOn(userService, 'getUser').and.returnValue($q.resolve());
        scope.$digest();
        expect(profilePage.find('order-block').length).toBeGreaterThan(0);
    });

    it('should display a loading spinner until user orders are loaded', function () {
        const deferred = $q.defer();
        spyOn(userService, 'userLoggedIn').and.returnValue(true);
        spyOn(userService, 'getUserOrders').and.returnValue(deferred.promise);
        spyOn(userService, 'getUser').and.returnValue($q.resolve());
        scope.$digest();
        expect(profilePage.find('#user-orders-spinner > div').css('display')).toBe('block');
        deferred.resolve(userOrders);
        scope.$digest();
        expect(profilePage.find('#user-orders-spinner > div').css('display')).toBe('none');
    });

    it('should display an info message if the user has no orders', function () {
        spyOn(userService, 'userLoggedIn').and.returnValue(true);
        spyOn(userService, 'getUserOrders').and.returnValue($q.resolve([]));
        spyOn(userService, 'getUser').and.returnValue($q.resolve());
        scope.$digest();
        expect(profilePage.find('#no-orders-message').length).toBe(1);
    });

    it('should delete the order from the UI when the callback for cancelled order is called', function () {
        spyOn(userService, 'userLoggedIn').and.returnValue(true);
        spyOn(userService, 'getUserOrders').and.returnValue($q.resolve(userOrders));
        spyOn(userService, 'getUser').and.returnValue($q.resolve());
        scope.$digest();
        expect(profilePage.find('order-block').length).toBe(2);
        profilePage.controller('profile-page').onOrderCancelled(1);
        scope.$digest();
        expect(profilePage.find('order-block').length).toBe(1);
    });

});