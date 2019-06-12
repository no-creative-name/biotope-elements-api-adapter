import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { deleteProps } from "../deleteProps";

export const imageTextMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
          ...renameGeneralProps(normalizedData.data, {
            'image.title' : 'image.alt'
          })
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XImageText`,
            fileUrl: generateComponentUrl(`components`, `XImageText`)
        },
    }

    return mappedData;
}