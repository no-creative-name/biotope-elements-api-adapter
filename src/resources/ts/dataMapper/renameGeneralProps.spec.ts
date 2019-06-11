import { expect } from 'chai';
import { renameGeneralProps } from './renameGeneralProps'

describe('#renameGeneralProps', () => {
    it('replaces and renames a property that is passed in', () => {
        const mappedData = renameGeneralProps({'title': 'Lorem Ipsum'}, {'title': 'heading'});
        
        expect(mappedData).to.deep.equal({'heading': 'Lorem Ipsum'})
    })
    it('returns other parameters that have not been configured to be renamed', () => {
        const mappedData = renameGeneralProps({'a': 'lorem', 'b': 'ipsum'}, {'a': 'c'});
        
        expect(mappedData).to.deep.equal({'c': 'lorem', 'b': 'ipsum'})
    })
    it('overwrites props that have already been declared', () => {
        const mappedData = renameGeneralProps({'a': 'lorem', 'b': 'ipsum'}, {'a': 'c', 'b': 'c'});
        
        expect(mappedData).to.deep.equal({'c': 'ipsum'})
    })
    it('can use data from a deeper folder', () => {
        const mappedData = renameGeneralProps({'image': {'url': 'www.xyz.com'}}, {'image.url': 'imageUrl'});
        
        expect(mappedData).to.deep.equal({'image': {}, 'imageUrl': 'www.xyz.com'})
    })
});
