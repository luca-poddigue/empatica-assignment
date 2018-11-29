angular.module('empatica')
    .component('spinner', {
        templateUrl: 'common/components/spinner/spinner.html',
        bindings: {
            promise: '<'
        },
        controller: function spinnerController($q, $scope) {
            const $ctrl = this;

            $ctrl.$onChanges = function (changes) {
                if (changes.promise && $ctrl.promise) {
                    $ctrl.loading = true;
                    $ctrl.promise.then(
                        (response) => {
                            $scope.$evalAsync(() => $ctrl.loading = false);
                            return response;
                        },
                        (rejection) => {
                            $scope.$evalAsync(() => $ctrl.loading = false);
                            return $q.reject(rejection);
                        }
                    );
                }
            };
        }
    })
;