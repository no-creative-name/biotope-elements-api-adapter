import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const contentBoxMapper: DataMapper = normalizedData => {
  const mappedData = {
    data: {
      ...normalizedData.data
    },
    metaData: {
      ...normalizedData.metaData,
      componentName: `XContentBox`,
      fileUrl: generateComponentUrl(`components`, `XContentBox`)
    }
  };

  console.log(mappedData);

  return mappedData;
};
