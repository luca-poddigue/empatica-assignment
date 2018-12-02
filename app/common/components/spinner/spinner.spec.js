describe('spinner component', () => {

    let spinner;
    let scope;
    let $q;

    beforeEach(module('empatica', ($exceptionHandlerProvider) => {
        $exceptionHandlerProvider.mode('log');
    }));

    beforeEach(inject((_$compile_, _$rootScope_, _$q_) => {
        $q = _$q_;
        scope = _$rootScope_.$new();
        spinner = _$compile_('<spinner promise="promise"></spinner>')(scope);
    }));

    it('should be visible when the promise is pending and hide when it resolves', () => {
        const deferred = $q.defer();
        scope.promise = deferred.promise;
        scope.$digest();
        expect(spinner.find('> div').css('display')).toBe('block');
        deferred.resolve();
        scope.$digest();
        expect(spinner.find('> div').css('display')).toBe('none');
    });

    it('should be visible when the promise is pending and hide if it errors out', () => {
        const deferred = $q.defer();
        scope.promise = deferred.promise;
        scope.$digest();
        expect(spinner.find('> div').css('display')).toBe('block');
        deferred.reject();

        scope.$digest();
        expect(spinner.find('> div').css('display')).toBe('none');
    });

    it('should be hidden when the promise is rejected', () => {
        scope.promise = $q.reject();
        scope.$digest();
        expect(spinner.find('> div').css('display')).toBe('none');
    });

    it('should be hidden when the promise is resolved', () => {
        scope.promise = $q.reject();
        scope.$digest();
        expect(spinner.find('> div').css('display')).toBe('none');
    });

    it('should be hidden if no promise is passed', () => {
        scope.$digest();
        expect(spinner.find('> div').css('display')).toBe('none');
    });
});