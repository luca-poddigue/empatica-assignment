describe('navigation', function () {


    it('should redirect to / when location does not correspond to any route', function () {
        browser.get('somethingUnmapped');
        expect(browser.getLocationAbsUrl()).toMatch("/");
    });

    it('should display the login button when the user is not logged in', function () {
        expect(element(by.id('login')).isPresent()).toBe(true);
    });

    describe('nav bar', function () {

        beforeEach(() => {
            browser.get('/');
            element(by.id('login')).click();
        });

        afterEach(() => {
            element(by.id('logout')).isPresent().then((present) => {
                if (present) {
                    element(by.id('logout')).click();
                }
            })
        });

        it('should show navigation links once the user is logged in', function () {
            expect(element(by.id('profile')).isPresent()).toBe(true);
            expect(element(by.id('logout')).isPresent()).toBe(true);
        });

        it('should redirect to home when clicking the link to home', function () {
            element(by.id('profile')).click();
            element(by.id('home')).click();
            expect(browser.getLocationAbsUrl()).toMatch("/");
        });

        it('should redirect to the user profile when clicking the link to profile', function () {
            element(by.id('profile')).click();
            expect(browser.getLocationAbsUrl()).toMatch("/profile");
        });

        it('should show the link to home only if the user is not already on the home page', function () {
            expect(element(by.id('home')).isPresent()).toBe(false);
            element(by.id('profile')).click();
            expect(element(by.id('home')).isPresent()).toBe(true);
        });

        it('should show the login button once the user has logged out', function () {
            element(by.id('logout')).click();
            expect(element(by.id('login')).isPresent()).toBe(true);
        });

        it('should redirect to home when the user logs out', function () {
            element(by.id('profile')).click();
            expect(browser.getLocationAbsUrl()).toMatch("/profile");
            element(by.id('logout')).click();
            expect(browser.getLocationAbsUrl()).toMatch("/");
        });
    });
});
