describe('feature helper service', () => {
    let featureHelperService;

    beforeEach(module('empatica'));

    beforeEach(inject((_$compile_, _$rootScope_, _featureHelperService_) => {
        featureHelperService = _featureHelperService_;
    }));

    describe('svg', () => {
        it('should return true if svg images are supported by the browser', () => {
            spyOn(document.implementation, 'hasFeature').and.returnValue(true);
            expect(featureHelperService.svg()).toBe(true);
        });

        it('should return false if svg images are not supported by the browser', () => {
            spyOn(document.implementation, 'hasFeature').and.returnValue(false);
            expect(featureHelperService.svg()).toBe(false);
        });

    });


});