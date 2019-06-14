import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { deleteProps } from "../deleteProps";
import { mapChildren } from "../mapChildren";

export const teaserComponentMapper: DataMapper = (normalizedData) => {
  const children = normalizedData.data;
    const mappedData = {
        data: {
          ...renameGeneralProps(normalizedData.data, {
           'teaserItemsCollection.items': 'items'
          }),
        
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XTeaserRow`,
            fileUrl: generateComponentUrl(`components`, `XTeaserRow`)
        },
    }
    // mappedData.data.items = [].concat(mappedData.data.teaserItem)


    return mappedData;
}