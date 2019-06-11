import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { mapData } from "../performDataMapping";
import { deleteProps } from "../deleteProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const accordionItemMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...renameGeneralProps(normalizedData.data, {'title': 'heading'}),
            ...mapChildren(normalizedData.data)
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XAccordionItem`,
            fileUrl: generateComponentUrl(`components/XAccordion`, `XAccordionItem`)
        },
    }
    
    return mappedData;
}