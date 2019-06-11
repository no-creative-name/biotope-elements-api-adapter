import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const accordionMapper: DataMapper = (normalizedData) => {
    const children = normalizedData.data.children;
    if(children.length) {
        children[0].data['opened'] = normalizedData.data['open-first-item'];
        children[children.length - 1].data['add-bottom-line'] = true;
    }
    const mappedData = {
        data: {
            ...renameGeneralProps(normalizedData.data, {
                'title': 'heading', 
                'link-external': 'link-url',
                'link-internal': 'link-url',
                'link-title': 'link-label'
            }),
            ...mapChildren(normalizedData.data)
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