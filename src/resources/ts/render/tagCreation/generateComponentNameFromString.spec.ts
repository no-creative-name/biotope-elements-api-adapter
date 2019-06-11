import { expect } from 'chai';
import { generateComponentNameFromString } from './generateComponentNameFromString';

describe('#generateComponentNameFromString', () => {
	it('handles undefined', () => {
		const componentName = generateComponentNameFromString(undefined);

		expect(componentName).to.eq('');
	});

	it('handles camelcase', () => {
		const componentName = generateComponentNameFromString('XaComp');

		expect(componentName).to.eq('xa-comp');
	});

	it('handles camelcase with one letter words', () => {
		const componentName = generateComponentNameFromString('XComp');

		expect(componentName).to.eq('x-comp');
	});
});
