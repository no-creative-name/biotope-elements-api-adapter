import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const tabItemMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...renameGeneralProps(normalizedData.data, {'title': 'heading'}),
            ...mapChildren(normalizedData.data)
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XTabItem`,
            fileUrl: generateComponentUrl(`components/XTabContainer`, `XTabItem`)
        }
    }
    
    return mappedData;
}