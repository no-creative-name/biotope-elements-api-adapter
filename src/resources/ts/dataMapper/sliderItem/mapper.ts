import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { deleteProps } from "../deleteProps";
import { DataMapper } from "../DataMapper";

export const sliderItemMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...deleteProps(renameGeneralProps(normalizedData.data, {'headline': 'heading', 'image.url': 'image-url', 'image.alt': 'image-alt'}), ['children'])
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XSliderSlide`,
            fileUrl: generateComponentUrl(`components/XSlider`, `XSliderSlide`)
        },
    }
    
    return mappedData;
}