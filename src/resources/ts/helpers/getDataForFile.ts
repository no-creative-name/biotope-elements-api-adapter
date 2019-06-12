import { getFieldFromName, getObjectForContentId } from "./cmsHelpers";

export const getDataForFile = async (contentId: string) => {
    const contentObject = await getObjectForContentId(contentId);
    const contentFields = contentObject.Content.CurrentVersion.Version.Fields.field;

    let heading = getFieldFromName(contentFields, 'name').fieldValue;
    let fileInfo = {
        fileSize: 0,
        mimeType: '',
        url: ''
    };

    if (getFieldFromName(contentFields, 'file').fieldValue !== null) {
        fileInfo = getFieldFromName(contentFields, 'file').fieldValue;
    }
    else if (getFieldFromName(contentFields, 'multilingual_file').fieldValue !== null) {
        fileInfo = getFieldFromName(contentFields, 'multilingual_file').fieldValue;
    }

    let fileSize = `${Math.round(fileInfo.fileSize / 10000) / 100} MB`;

    let type = fileInfo.mimeType;
    const splitted = type.split('/');
    type = splitted[splitted.length - 1].toUpperCase();

    let url = fileInfo.url;

    let linkTitle = getFieldFromName(contentFields, 'description').fieldValue.xhtml5edit;
    linkTitle = linkTitle.substring(
        linkTitle.lastIndexOf("<p>") + 3,
        linkTitle.lastIndexOf("</p>")
    );

    return {
        heading,
        fileSize,
        type,
        linkTitle,
        url
    }
}