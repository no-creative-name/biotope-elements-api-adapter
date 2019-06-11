import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";import { deleteProps } from "../deleteProps";
;

export const routingTeaserItemMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        ...deleteProps(renameGeneralProps(normalizedData.data, {'headline': 'heading', 'content': 'text', 'image.url': 'media', 'image.altText': 'mediaAlt', 'link-title': 'actionText', 'link-external': 'actionUrl', 'link-internal': 'actionUrl'}), ['children'])
    }
    
    return mappedData;
}