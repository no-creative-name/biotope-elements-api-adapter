import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const primaryCtaMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...renameGeneralProps(normalizedData.data, {'title': 'heading', 'link-target-blank': 'link-target', 'link-title': 'link-label', 'link-external': 'link', 'link-internal': 'link'}),
            ...mapChildren(normalizedData.data)
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XPrimaryCTA`,
            fileUrl: generateComponentUrl(`components`, `XPrimaryCTA`),
            fullWidth: true,
            noVerticalMargins: true
        },
    }
    
    return mappedData;
}