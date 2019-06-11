import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { deleteProps } from "../deleteProps";

export const leadTextMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...deleteProps(renameGeneralProps(normalizedData.data, {'title': 'heading'}), ['children'])
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XLeadText`,
            fileUrl: generateComponentUrl(`components`, `XLeadText`)
        },
    }
    
    return mappedData;
}