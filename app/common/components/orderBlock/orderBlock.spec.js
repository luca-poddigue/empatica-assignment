describe('order block', () => {

    let order;
    let userService;
    let scope;
    let $compile;
    let $q;

    const orderDef = {
        "id": 2,
        "ref": "#ord-2018-b6012cc8",
        "status": "paid",
        "tracking": {"carrier": "UPS", "trackingCode": "DAJA91930102NDAKKS0", "status": "in_transit"},
        "items": [{
            "sku": "emb-bb-s",
            "name": "Embrace Watch - Stretchable Band Blue",
            "amount": 249
        }, {"sku": "emb-mb-s", "name": "Embrace Watch - Stretchable Band Black", "amount": 249}],
        "discounts": [{"name": "2x1 Embrace", "type": "amount", "value": 249}, {
            "name": "Christmas 2018 - 10% OFF",
            "type": "percent",
            "value": 10
        }]
    };
    const orderDefWithoutTrackingAndDiscounts = {
        "id": 1,
        "ref": "#ord-2018-a993bee3",
        "status": "paid",
        "tracking": null,
        "items": [{
            "sku": "emb-mb-s",
            "name": "Embrace Watch - Stretchable Band Black",
            "amount": 249
        }, {"sku": "emb-bb-s", "name": "Embrace Watch - Stretchable Band Blue", "amount": 249}],
        "discounts": null
    };

    beforeEach(module('empatica'));

    beforeEach(inject((_$compile_, _$rootScope_, _userService_, _$q_) => {
        $q = _$q_;
        userService = _userService_;
        $compile = _$compile_;
        scope = _$rootScope_.$new();
    }));

    describe('order ref', () => {
        it('should show the order ref', () => {
            compileWithOrderDef(orderDef);
            expect(order.find('.order-ref').text()).toBe('#ord-2018-b6012cc8');
        });
    });

    describe('order status', () => {
        it('should format and show the order status', () => {
            compileWithOrderDef(orderDef);
            expect(order.find('.order-status').text()).toBe('Paid');
        });
    });

    describe('ordered items', () => {
        it('should show ordered items', () => {
            compileWithOrderDef(orderDef);
            expect(order.find('.ordered-item').length).toBe(2);
            expect($(order.find('.ordered-item .name')[0]).text()).toBe('Embrace Watch - Stretchable Band Blue');
            expect($(order.find('.ordered-item .name')[1]).text('Embrace Watch - Stretchable Band Black'));
        });

        it('should show ordered items prices', () => {
            compileWithOrderDef(orderDef);
            expect(order.find('.ordered-item').length).toBe(2);
            expect($(order.find('.ordered-item .value')[0]).text()).toBe('$249.00');
            expect($(order.find('.ordered-item .value')[1]).text('$249.00'));
        });
    });

    describe('discounts', () => {
        it('should show discounts if the order has discounts', () => {
            compileWithOrderDef(orderDef);
            expect(order.find('.discounts').length).toBe(1);
            expect($(order.find('.discounts .item .name')[0]).text()).toBe('2x1 Embrace');
            expect($(order.find('.discounts .item .name')[1]).text()).toBe('Christmas 2018 - 10% OFF');
        });

        it('should not show discounts if the order has no discounts', () => {
            compileWithOrderDef(orderDefWithoutTrackingAndDiscounts);
            expect(order.find('.discounts').length).toBe(0);
        });

        it('should compute and render the amount discount saving', () => {
            compileWithOrderDef(orderDef);
            expect($(order.find('.discounts .item .value')[0]).text()).toBe('-$249.00');
        });

        it('should compute and render the percentage discount saving', () => {
            compileWithOrderDef(orderDef);
            expect($(order.find('.discounts .item .value')[1]).text()).toBe('-$49.80');
        });
    });

    describe('total order price', () => {
        it('should compute the total price of the order', () => {
            compileWithOrderDef(orderDefWithoutTrackingAndDiscounts);
            expect(order.find('.total .value').text()).toBe('$498.00');
        });

        it('should compute the total price of the order considering the discount', () => {
            compileWithOrderDef(orderDef);
            expect(order.find('.total .value').text()).toBe('$199.20');
        });
    });

    describe('tracking', () => {
        it('should show tracking info if the order has tracking info', () => {
            compileWithOrderDef(orderDef);
            expect(order.find('.tracking').length).toBe(1);
            expect($(order.find('.tracking .item .value')[0]).text()).toBe('UPS');
            expect($(order.find('.tracking .item .value')[1]).text()).toBe('DAJA91930102NDAKKS0');
            expect($(order.find('.tracking .item .value')[2]).text()).toBe('In transit');
        });

        it('should not show tracking info if the order has no tracking info', () => {
            compileWithOrderDef(orderDefWithoutTrackingAndDiscounts);
            expect(order.find('.tracking').length).toBe(0);
        });
    });

    describe('order cancellation', () => {
        it('should call the user service to delete the order', () => {
            spyOn(userService, 'cancelUserOrder').and.returnValue($q.resolve());
            compileWithOrderDef(orderDefWithoutTrackingAndDiscounts);
            order.find('.delete-btn a').click();
            order.find('modal button.cancel-order').click();
            expect(userService.cancelUserOrder).toHaveBeenCalledWith(1);
        });

        it('should call the cancellation callback', () => {
            spyOn(userService, 'cancelUserOrder').and.returnValue($q.resolve());
            const callback = jasmine.createSpy('onOrderCancelledCallback');
            compileWithOrderDef(orderDefWithoutTrackingAndDiscounts, callback);
            order.find('.delete-btn a').click();
            order.find('modal button.cancel-order').click();
            expect(callback).toHaveBeenCalled();
        });
    });

    function compileWithOrderDef(orderDef, onOrderCancelledCallback) {
        scope.orderDef = orderDef;
        scope.onOrderCancelledCallback = onOrderCancelledCallback;
        order = $compile('<order-block order="orderDef" on-order-cancelled="onOrderCancelledCallback(index)">')(scope);
        scope.$digest();
    }
});