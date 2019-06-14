import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const primaryCtaMapper: DataMapper = normalizedData => {
  const mappedData = {
    data: {
      ...renameGeneralProps(normalizedData.data, {
        "link-external": "link"
      })
    },
    metaData: {
      ...normalizedData.metaData,
      componentName: `XPrimaryCTA`,
      fileUrl: generateComponentUrl(`components`, `XPrimaryCTA`),
      fullWidth: true,
      noVerticalMargins: true
    }
  };
  mappedData.data.icon = mappedData.data.icon.toLowerCase();
  mappedData.data["link-target"] =
    mappedData.data["link-target"] == true ? "_blank" : "_self";

  return mappedData;
};
