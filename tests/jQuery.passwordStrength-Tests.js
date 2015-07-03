describe('jQuery.passwordStrength Initialisation', function() {

		var el, testForm;

		beforeEach(function(){
				jasmine.getFixtures().fixturesPath = 'base/tests';
				loadFixtures('test.html');
				el = $('#simple-form');
				testForm = el.passwordStrength().data('passwordStrength');
	  });

	  it('Should add the class "passwordStrength" to the element', function() {
				expect(el.hasClass('passwordStrength')).toBe(true);
	  });

});
