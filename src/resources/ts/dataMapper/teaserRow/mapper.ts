import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";
import { deleteProps } from "../deleteProps";

export const teaserRowMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...mapChildren(normalizedData.data, 'items'),
            ...deleteProps(renameGeneralProps(normalizedData.data, {'headline': 'heading'}), ['children']),
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XTeaserRow`,
            fileUrl: generateComponentUrl(`components`, `XTeaserRow`),
            fullWidth: true
        }
    }
    
    return mappedData;
}