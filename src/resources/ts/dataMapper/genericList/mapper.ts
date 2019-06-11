import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const genericListMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...renameGeneralProps(normalizedData.data, {'headline': 'heading'}),
            ...mapChildren(normalizedData.data)
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: "XList",
            fileUrl: generateComponentUrl(`components`, 'XList')
        }
    }
    
    return mappedData;
}