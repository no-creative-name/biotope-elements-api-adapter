import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";

export const fileMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        ...renameGeneralProps(normalizedData.data, {
            'url': 'link',
            'fileName': 'linkLabel',
            'mimeType': 'type',
            'name': 'heading'
        }),
    }

    return mappedData;
}