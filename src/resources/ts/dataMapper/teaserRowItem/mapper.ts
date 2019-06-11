import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { deleteProps } from "../deleteProps";

export const teaserRowItemMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        ...deleteProps(renameGeneralProps(normalizedData.data, {
            'title': 'heading',
            'link-title': 'linkLabel',
            'link-external': 'url',
            'link-internal': 'url'
        }), ['children'])
    }

    mappedData['target'] = mappedData['link-target-blank'] == true ? '_blank' : '_self'
    delete mappedData['link-target-blank']
    
    return mappedData;
}