import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { deleteProps } from "../deleteProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const downloadListMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...mapChildren(normalizedData.data, 'items'),
            ...deleteProps(renameGeneralProps(normalizedData.data, { 'headline': 'heading', 'link-title': 'link-label', 'link-external': 'link-url', 'link-internal': 'link-url' }), ['children']),
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: "XDownloadList",
            fileUrl: generateComponentUrl(`components`, 'XDownloadList')
        }
    }

    mappedData.data['link-target'] = mappedData.data['link-target-blank'] == true ? '_blank' : '_self'
    delete mappedData.data['link-target-blank']

    return mappedData;
}