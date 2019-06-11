import { expect } from 'chai';
import { generateComponentUrl } from './generateComponentUrl';

describe('#generateComponentUrl', () => {
    it('handles undefined base', () => {
        const webComponentUrl = generateComponentUrl(undefined, 'SomeComponent');

        expect(webComponentUrl).to.eq('/SomeComponent/index.js')
    });

    it('handles undefined component name by throwing error', () => {
        expect(generateComponentUrl.bind('http://test.com/resources', undefined)).to.throw('Component name not provided. unable to create url.');
    });

    it('handles base ending with /', () => {
        const webComponentUrl = generateComponentUrl('http://test.com/resources/', 'SomeComponent');

        expect(webComponentUrl).to.eq('http://test.com/resources/SomeComponent/index.js')
    });

    it('handles base ending without /', () => {
        const webComponentUrl = generateComponentUrl('http://test.com/resources', 'SomeComponent');

        expect(webComponentUrl).to.eq('http://test.com/resources/SomeComponent/index.js')
    });
});
