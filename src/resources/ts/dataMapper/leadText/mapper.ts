import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { DataMapper } from "../DataMapper";

export const leadTextMapper: DataMapper = normalizedData => {
  const mappedData = {
    data: {
      ...normalizedData.data,
      class:
        "component-spacing-top component-spacing-bottom row row--reducedWidth"
    },
    metaData: {
      ...normalizedData.metaData,
      componentName: `XLeadText`,
      fileUrl: generateComponentUrl(`components`, `XLeadText`)
    }
  };
  return mappedData;
};
