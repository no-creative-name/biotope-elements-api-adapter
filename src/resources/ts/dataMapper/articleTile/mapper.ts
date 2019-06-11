import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";
import { deleteProps } from "../deleteProps";

export const articleTileMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...renameGeneralProps(normalizedData.data, {'title': 'heading'}),
            ...deleteProps(mapChildren(normalizedData.data, 'items'), ['children'])
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XArticleTile`,
            fileUrl: generateComponentUrl(`components`, `XArticleTile`)
        },
    }
    delete mappedData.data.children;

    return mappedData;
}