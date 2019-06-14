import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { deleteProps } from "../deleteProps";

export const teaserComponentMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
          ...renameGeneralProps(normalizedData.data, {
            'image.title' : 'image.alt'
          })
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XTeaserRow`,
            fileUrl: generateComponentUrl(`components`, `XTeaserRow`)
        },
    }
    mappedData.data.items = [].concat(mappedData.data.teaserItem)

    return mappedData;
}