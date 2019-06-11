import { expect } from 'chai';
import { mapChildren } from './mapChildren';

describe('#mapChildren', () => {
    it('returns an empty object when no children are available', () => {
        const mappedData = mapChildren({}, 'items');
        
        expect(mappedData).to.deep.equal({})
    })
});
