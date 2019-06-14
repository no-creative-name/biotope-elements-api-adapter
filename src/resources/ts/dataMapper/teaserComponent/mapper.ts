import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { deleteProps } from "../deleteProps";
import { mapChildren } from "../mapChildren";

export const teaserComponentMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
          ...renameGeneralProps(normalizedData.data, {
            'teaserItemsCollection.items' : 'children'
          }),
          ...mapChildren(normalizedData.data)
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XTeaserRow`,
            fileUrl: generateComponentUrl(`components`, `XTeaserRow`)
        },
    }
    console.log("Console Log: ----------------------------------------------------------------------")
    console.log("Console Log: teaserComponentMapper:DataMapper -> mappedData", mappedData)
    console.log("Console Log: ----------------------------------------------------------------------")
    // mappedData.data.items = [].concat(mappedData.data.teaserItem)


    return mappedData;
}