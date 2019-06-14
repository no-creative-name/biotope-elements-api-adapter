import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const contentBoxMapper: DataMapper = normalizedData => {
  const mappedData = {
    data: {
      ...renameGeneralProps(normalizedData.data, { title: "headline" }),
      ...mapChildren(normalizedData.data),
      class: "component-spacing-top component-spacing-bottom"
    },
    metaData: {
      ...normalizedData.metaData,
      componentName: `XContentBox`,
      fileUrl: generateComponentUrl(`components`, `XContentBox`)
    }
  };

  return mappedData;
};
