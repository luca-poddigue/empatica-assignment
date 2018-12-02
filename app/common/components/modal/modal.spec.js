describe('modal component', () => {
    let modal;
    let scope;

    const modalTitle = 'The modal title';
    const modalBody = 'The modal body';
    const modalFooter = 'The modal footer';

    beforeEach(module('empatica'));

    beforeEach(inject((_$compile_, _$rootScope_) => {
        scope = _$rootScope_.$new();
        scope.modalTitle = modalTitle;
        scope.modalBody = modalBody;
        scope.modalFooter = modalFooter;
        modal = _$compile_(
            `<modal modal-title="{{modalTitle}}">
                <modal-body>{{modalBody}}</modal-body>
                <modal-footer>{{modalFooter}}</modal-footer>
             </modal>`
        )(scope);
        scope.$digest();
    }));

    it('should populate itself based on the content set in its title and transclusion blocks', () => {
        expect(modal.find('.modal-title').text()).toBe(modalTitle);
        expect(modal.find('.modal-body').text()).toBe(modalBody);
        expect(modal.find('.modal-footer').text()).toBe(modalFooter);
    });
});