import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";

export const articleTileItemMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        ...renameGeneralProps(normalizedData.data, {'subline': 'heading', 'image.url': 'img', 'image.altText': 'imgAlt', 'link-external': 'link', 'link-internal': 'link'}),
    }
    mappedData['link-target'] = mappedData['link-target-blank'] == true ? '_blank' : '_self'
    delete mappedData['link-target-blank']
    
    return mappedData;
}