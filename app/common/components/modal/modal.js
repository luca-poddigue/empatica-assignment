/**
 * Generic component to show a modal. The content is completely customizable. The modal title can be passed as an attribute, whilst the body and footer can be populated with transusion blocks.
 *
 * @param modal-title A string representing the title of the modal.
 *
 * @example
 *  <modal modal-title="The modal title">
 *      <modal-body>
 *          The modal body
 *      </modal-body>
 *      <modal-footer>
 *          <button>A button within modal footer</button>
 *      </modal-footer>
 *  </modal>
 */
angular.module('empatica')
    .component('modal', {
        bindings: {
            modalTitle: '@'
        },
        /* Need to declare the template inline due to an Angular bug that prevents the css transition to run properly the first time. See https://stackoverflow.com/questions/35635529/why-doesnt-my-directives-enter-animation-using-ng-if-run-on-first-time-when-us */
        template: `<div class="modal-content">
                        <h2 class="modal-title" ng-bind="$ctrl.modalTitle"></h2>
                        <div class="modal-body" ng-transclude="modalBody"></div>
                        <div class="modal-footer" ng-transclude="modalFooter"></div>
                   </div>
                   <div class="backdrop"></div>`,
        transclude: {
            modalBody: 'modalBody',
            modalFooter: 'modalFooter'
        },
        controller: function () {
        }
    });