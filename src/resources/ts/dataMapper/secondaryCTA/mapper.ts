import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const secondaryCtaMapper: DataMapper = (normalizedData) => {
    const mappedData = {
        data: {
            ...renameGeneralProps(normalizedData.data, {
                'title': 'heading',
                'text': 'rich-text',
                'link-target-blank': 'button-link-target',
                'link-title': 'button-link-label',
                'link-external': 'button-link',
                'link-internal': 'button-link',
                'arrow-link-target-blank': 'text-link-target',
                'arrow-link-title': 'text-link-label',
                'arrow-link-external': 'text-link',
                'arrow-link-internal': 'text-link'
            }),
            ...mapChildren(normalizedData.data)
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: `XSecondaryCTA`,
            fileUrl: generateComponentUrl(`components`, `XSecondaryCTA`),
            fullWidth: true,
            noVerticalMargins: true
        },
    }
    
    return mappedData;
}