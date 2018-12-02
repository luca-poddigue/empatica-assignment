describe('profile', function () {

    it('should redirect to home if the user tries to access his profile but he is not logged in', function () {
        browser.get('/profile');
        expect(browser.getCurrentUrl()).toBe(browser.baseUrl);
    });

    describe('personal details', function () {

        beforeAll(() => {
            browser.get('/');
            element(by.id('login')).click();
            element(by.id('profile')).click();
        });

        afterAll(() => {
            element(by.id('logout')).click();
        });

        it('should display the user full name and email after personal details are loaded', function () {
            expect(element(by.css('.profile #name h2')).getText()).toBe('John Doe');
            expect(element(by.css('.profile #email h2')).getText()).toBe('john@doe.com');
        });
    });

    describe('orders', function () {

        beforeAll(() => {
            browser.get('/');
            element(by.id('login')).click();
            element(by.id('profile')).click();
        });

        afterAll(() => {
            element(by.id('logout')).click();
        });

        it('should display order details after orders are loaded', function () {
            const orders = element.all(by.css('order-block'));
            expect(orders.count()).toBe(2);
            expect(orders.get(0).element(by.css('.order-ref')).getText()).toBe('#ord-2018-a993bee3');
            expect(orders.get(1).element(by.css('.order-ref')).getText()).toBe('#ord-2018-b6012cc8');
        });

        it('should display a confirmation modal if the user click clicks the Cancel button', function () {
            const orderToDelete = element.all(by.css('order-block')).first();
            orderToDelete.element(by.css('.delete-btn a')).click();
            const modal = orderToDelete.element(by.css('.cancel-order-modal'));
            expect(modal.isPresent()).toBe(true);
            modal.element(by.css('.close')).click();
        });

        it('should dismiss the modal when clicking on Close', function () {
            const orderToDelete = element.all(by.css('order-block')).first();
            orderToDelete.element(by.css('.delete-btn a')).click();
            const modal = orderToDelete.element(by.css('.cancel-order-modal'));
            modal.element(by.css('.close')).click();
            expect(modal.isPresent()).toBe(false);
            expect(orderToDelete.isPresent()).toBe(true);
        });

        it('should cancel the order and dismiss the modal when clicking on Cancel Order', function () {
            const orderToDelete = element.all(by.css('order-block')).first();
            const orderToDeleteRef = orderToDelete.element(by.css('.order-ref')).getText();
            orderToDelete.element(by.css('.delete-btn a')).click();
            const modal = orderToDelete.element(by.css('.cancel-order-modal'));
            modal.element(by.css('.cancel-order')).click();
            expect(modal.isPresent()).toBe(false);
            const orders = element.all(by.css('order-block'));
            expect(orders.count()).toBe(1);
            expect(orders.get(0).element(by.css('.order-ref')).getText()).not.toBe(orderToDeleteRef);
        });
    });

})
;
