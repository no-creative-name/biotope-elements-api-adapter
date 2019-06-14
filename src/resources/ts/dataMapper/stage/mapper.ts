import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { DataMapper } from "../DataMapper";

export const stageMapper: DataMapper = normalizedData => {
  const mappedData = {
    data: {
      ...normalizedData.data
    },
    metaData: {
      ...normalizedData.metaData,
      componentName: `XStage`,
      fileUrl: generateComponentUrl(`components`, `XStage`)
    }
  };

  return mappedData;
};
