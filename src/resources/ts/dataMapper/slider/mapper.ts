import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const sliderMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...renameGeneralProps(normalizedData.data, {'headline': 'heading'}),
            ...mapChildren(normalizedData.data)
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: "XSlider",
            fileUrl: generateComponentUrl(`components`, 'XSlider')
        }
    }
    
    return mappedData;
}