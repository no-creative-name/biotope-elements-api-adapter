import { renameGeneralProps } from "../renameGeneralProps";
import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";

export const textMediaInlineMapper = (normalizedData) => {
    const mediaType = normalizedData.data['media-image'].url ? 'image' : 'video';
    const mappedData = {
        data: {
            'media-type': mediaType,
            ...renameGeneralProps(normalizedData.data, {
                'title': 'heading',
                'text-content': 'rich-text',
                'media-image.url': 'media-url',
                'media-video': 'media-url',
                'media-image.altText': 'media-alt-text',
            })
        },
        metaData: {
            ...normalizedData.metaData,
            componentName: "XTextMediaInline",
            fileUrl: generateComponentUrl(`components`, 'XTextMediaInline')
        },
    }
    switch (mappedData.data['bullet-icon']) {
        case 'checkmark':
            mappedData.data['bullet-icon'] = 'check'
            break;
        case 'en-dash':
            mappedData.data['bullet-icon'] = 'dash'
            break;
    }

    return mappedData;
}