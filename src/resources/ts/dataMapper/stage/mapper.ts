import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { deleteProps } from "../deleteProps";

export const stageMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...deleteProps(renameGeneralProps(normalizedData.data, {'image.url': 'image.url', 'image.alt': 'image.altText', 'image.align': 'image-alignment', 'headline': 'text.headline', 'claim': 'text.claim'}), ['children'])
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XStage`,
            fileUrl: generateComponentUrl(`components`, `XStage`),
            fullWidth: true,
            noVerticalMargins: true
        },
    }

    return mappedData;
}