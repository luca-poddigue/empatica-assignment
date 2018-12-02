describe('main view component', () => {
    let mainView;
    let scope;
    let userService;
    let $location;
    let $q;

    beforeEach(module('empatica'));

    beforeEach(inject((_$compile_, _$rootScope_, _userService_, _$location_, _$q_) => {
        userService = _userService_;
        $q = _$q_;
        $location = _$location_;
        spyOn(userService, 'login');
        spyOn(userService, 'logout');
        scope = _$rootScope_.$new();
        mainView = _$compile_('<main-view></main-view>'
        )(scope);
    }));

    it('should show only the login button if the user is not logged in', () => {
        spyOn(userService, 'userLoggedIn').and.returnValue(false);
        scope.$digest();
        expect(mainView.find('#login').length).toBe(1);
        expect(mainView.find('#profile').length).toBe(0);
        expect(mainView.find('#logout').length).toBe(0);
    });

    it('should login when the login button is clicked', () => {
        spyOn(userService, 'userLoggedIn').and.returnValue(false);
        scope.$digest();
        mainView.find('#login').click();
        expect(userService.login).toHaveBeenCalled();
    });

    it('should show all the buttons except login if the user is logged in', () => {
        spyOn(userService, 'userLoggedIn').and.returnValue(true);
        scope.$digest();
        expect(mainView.find('#login').length).toBe(0);
        expect(mainView.find('#profile').length).toBe(1);
        expect(mainView.find('#logout').length).toBe(1);
    });

    it('should logout when the logout button is clicked', () => {
        spyOn(userService, 'userLoggedIn').and.returnValue(true);
        scope.$digest();
        mainView.find('#logout').click();
        expect(userService.logout).toHaveBeenCalled();
    });

    it('should go to the home page when the logout button is clicked', () => {
        spyOn(userService, 'userLoggedIn').and.returnValue(true);
        spyOn($location, 'url');
        scope.$digest();
        mainView.find('#logout').click();
        expect($location.url).toHaveBeenCalledWith('/');
    });

    it('should not show the home button when on the home page', () => {
        spyOn($location, 'path').and.returnValue("/");
        scope.$digest();
        expect(mainView.find('#home').length).toBe(0)
    });

    it('should show the home button when not on the home page', () => {
        spyOn($location, 'path').and.returnValue("/someOtherPage");
        scope.$digest();
        expect(mainView.find('#home').length).toBe(1);
    });

    it('should lock and highlight the button when it corresponds to the current page', () => {
        spyOn(userService, 'userLoggedIn').and.returnValue(true);
        spyOn(userService, 'getUser').and.returnValue($q.resolve());
        spyOn(userService, 'getUserOrders').and.returnValue($q.resolve());
        $location.url('/profile');
        scope.$digest();
        expect(mainView.find('#profile').hasClass('current')).toBe(true);
    });

    it('should display the content corresponding to the current route', () => {
        spyOn(userService, 'userLoggedIn').and.returnValue(true);
        spyOn(userService, 'getUser').and.returnValue($q.resolve());
        spyOn(userService, 'getUserOrders').and.returnValue($q.resolve());
        $location.url('/profile');
        scope.$apply();
        expect(mainView.find('profile-page').length).toBe(1);
        $location.url('/');
        scope.$apply();
        expect(mainView.find('home-page').length).toBe(1);
    });
});