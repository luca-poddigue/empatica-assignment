angular.module('empatica')
    .component('orderBlock', {
        bindings: {
            order: '<'
        },
        templateUrl: 'common/components/orderBlock/orderBlock.html',
        controller: function orderController($exceptionHandler) {

            const $ctrl = this;

            $ctrl.$onInit = () => {
                $ctrl.order = angular.copy($ctrl.order);
                $ctrl.order.itemsTotal = computeTotal($ctrl.order.items);
                if ($ctrl.order.discounts) {
                    for (const discount of $ctrl.order.discounts) {
                        discount.amount = computeDiscountAmount(discount, $ctrl.order.itemsTotal)
                    }
                    $ctrl.order.discountsTotal = computeTotal($ctrl.order.discounts);
                } else {
                    $ctrl.order.discountsTotal = 0;
                }
            };

            function computeTotal(items) {
                return items.map(item => item.amount).reduce((a, b) => a + b, 0);
            }

            function computeDiscountAmount(discount, itemsTotal) {
                if (discount.type === 'amount') {
                    return discount.value;
                }
                if (discount.type === 'percent') {
                    return itemsTotal * discount.value / 100;
                }
                $exceptionHandler(new Error(`Unrecognized discount type: ${discount.type}.`));
            }
        }
    });