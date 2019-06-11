import { expect } from 'chai';
import { deleteProps } from './deleteProps';

describe('#deleteProps', () => {
    it('returns the unaltered input for undefined props to remove', () => {
        const mappedData = deleteProps({'title': 'Lorem'}, undefined);
        
        expect(mappedData).to.deep.equal({'title': 'Lorem'})
    })
    it('returns an empty data object for undefined input data', () => {
        const mappedData = deleteProps(undefined, undefined);
        
        expect(mappedData).to.deep.equal({})
    })
    it('only deletes props specified in array', () => {
        const mappedData = deleteProps({'title': 'Lorem', 'param': 'value'}, ['title']);
        
        expect(mappedData).to.deep.equal({'param': 'value'})
    })
});
