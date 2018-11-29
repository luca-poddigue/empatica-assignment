/**
 * Displays a block containing all the details related to the order.
 *
 * @params order The object defining the order.
 * @params onOrderCancelled The method to be called when the order gets cancelled.
 *
 * @example
 * <order-block order="$ctrl.orderDef" on-order-cancelled="$ctrl.onOrderCancelled()"></order-block>
 */
angular.module('empatica')
    .component('orderBlock', {
        bindings: {
            order: '<',
            onOrderCancelled: '&?'
        },
        templateUrl: 'common/components/orderBlock/orderBlock.html',
        controller: function orderController(userService, $exceptionHandler) {

            const $ctrl = this;

            /**
             * Initializes the order by computing the total price of the order and, for each discount, the effective amount of saving.
             */
            $ctrl.$onInit = () => {
                $ctrl.cancelOrderModalVisible = false;

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

            /**
             * Shows or hides the modal to confirm the deletion of the order.
             * @param visible True to show the modal, false to hide it.
             */
            $ctrl.setCancelOrderModalVisible = (visible = true) => {
                $ctrl.cancelOrderModalVisible = visible;
            };

            /**
             * Cancels the current order and notifies the deletion through the method binding "onOrderCancelled()".
             */
            $ctrl.cancelOrder = () => {
                $ctrl.cancellingOrder = true;
                $ctrl.cancelOrderPromise = userService.cancelUserOrder($ctrl.order.id).then(
                    () => {
                        $ctrl.cancellingOrder = false;
                        $ctrl.onOrderCancelled();
                        $ctrl.setCancelOrderModalVisible(false);
                    },
                    () => $ctrl.cancellingOrder = false
                )
                ;
            };

            /**
             * Computes the total amount given a list of items
             * @param items The list of items
             * @returns {number} The total amount (price or saving)
             */
            function computeTotal(items) {
                return items.map(item => item.amount).reduce((a, b) => a + b, 0);
            }

            /**
             * Given a discount, computes the effective saving it produces.
             * @param discount The discount object.
             * @param itemsTotal The total price of the items in the order.
             * @returns {number} The amount of saving produced by the discount.
             */
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