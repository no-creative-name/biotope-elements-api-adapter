import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";
import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";

export const genericListItemMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...renameGeneralProps(normalizedData.data, {
                'headline': 'heading',
                'image.url': 'imageUrl',
                'image.altText': 'imageAlt',
                'link-external': 'linkUrl',
                'link-internal': 'linkUrl',
                'link-title': 'linkLabel'
            }),
            ...mapChildren(normalizedData.data)
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: "XListItem",
            fileUrl: generateComponentUrl(`components/XList`, 'XListItem')
        }
    }

    mappedData.data.linkTarget = mappedData['link-target-blank'] == true ? '_blank' : '_self'
    delete mappedData['link-target-blank']
    
    return mappedData;
}