import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const accordionItemMapper: DataMapper = (normalizedData) => {
    const childObj = {children:  [normalizedData.content]};
    const mappedData = {
        data: {
            ...renameGeneralProps(normalizedData, {
                'title': 'heading',
                'content.items': 'children'
            }),
            ...mapChildren(childObj)
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XAccordionItem`,
            fileUrl: generateComponentUrl(`components/XAccordion`, `XAccordionItem`)
        },
    }
    
    return mappedData;
}