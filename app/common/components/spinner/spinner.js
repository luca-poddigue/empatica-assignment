angular.module('empatica')
    .component('spinner', {
        templateUrl: 'common/components/spinner/spinner.html',
        bindings: {
            promise: '<'
        },
        controller: function spinnerController() {
            const $ctrl = this;

            $ctrl.$onChanges = function (changes) {
                if (changes.promise && $ctrl.promise) {
                    $ctrl.loading = true;
                    $ctrl.promise.finally(
                        () =>
                            $ctrl.loading = false
                    );
                }
            };
        }
    })
;