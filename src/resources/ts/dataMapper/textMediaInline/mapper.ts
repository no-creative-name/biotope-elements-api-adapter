import { renameGeneralProps } from "../renameGeneralProps";
import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";

export const textMediaInlineMapper = normalizedData => {
  const mappedData = {
    data: {
      ...renameGeneralProps(normalizedData.data, {
        title: "heading",
        "text-content": "rich-text",
        "media-image.url": "media-url",
        "media-video": "media-url",
        "media-image.altText": "media-alt-text"
      })
    },
    metaData: {
      ...normalizedData.metaData,
      componentName: "XTextMediaInline",
      fileUrl: generateComponentUrl(`components`, "XTextMediaInline")
    }
  };
  return mappedData;
};
