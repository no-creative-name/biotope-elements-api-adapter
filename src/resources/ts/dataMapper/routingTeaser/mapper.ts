import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { deleteProps } from "../deleteProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const routingTeaserMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...mapChildren(normalizedData.data, 'cards'),
            ...deleteProps(renameGeneralProps(normalizedData.data, {'title': 'heading', 'subline': 'text', 'link-title': 'link-label', 'link-external': 'link-uri', 'link-internal': 'link-uri'}), ['children'])
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XRoutingTeaser`,
            fileUrl: generateComponentUrl(`components`, `XRoutingTeaser`),
            fullWidth: true
        }
    }
    
    mappedData.data['link-target'] = mappedData.data['link-target-blank'] == true ? '_blank' : '_self'
    delete mappedData.data['link-target-blank']
    
    return mappedData;
}