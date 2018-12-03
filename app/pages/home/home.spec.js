describe('home page', function () {

    let homePage;
    let featureHelperService;
    let scope;

    beforeEach(module('empatica'));

    beforeEach(inject((_$compile_, _$rootScope_, _featureHelperService_) => {
        featureHelperService = _featureHelperService_;
        scope = _$rootScope_.$new();
        homePage = _$compile_('<home-page></home-page>')(scope);
    }));

    it('should display svg logo if browser supports svg images', function () {
        spyOn(featureHelperService, 'svg').and.returnValue(true);
        scope.$digest();
        expect(homePage.find('.logo').attr('ng-src').endsWith('.svg')).toBe(true);
    });

    it('should display png logo if browser does not support svg images', function () {
        spyOn(featureHelperService, 'svg').and.returnValue(false);
        scope.$digest();
        expect(homePage.find('.logo').attr('ng-src').endsWith('.png')).toBe(true);
    });

});