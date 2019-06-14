import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const accordionMapper: DataMapper = (normalizedData) => {
    const children = normalizedData.data;

    const mappedData = {
        data: {
            ...renameGeneralProps(normalizedData.data, {
                'title': 'heading',
                'description': 'text',
                'firstItemOpen': 'open-first-item',
                'accordionItemsCollection.items': 'children'
            }),
            ...mapChildren(children)
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XAccordion`,
            fileUrl: generateComponentUrl(`components`, `XAccordion`)
        },
    }

    mappedData.data['link-target'] = mappedData.data['link-target-blank'] == true ? '_blank' : '_self'
    delete mappedData.data['link-target-blank']
    
    return mappedData;
}