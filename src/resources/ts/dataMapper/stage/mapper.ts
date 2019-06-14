import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { DataMapper } from "../DataMapper";
import { renameGeneralProps } from "../renameGeneralProps";

export const stageMapper: DataMapper = normalizedData => {
  const mappedData = {
    data: {
      ...renameGeneralProps(normalizedData.data, {
        "image.fileName": "image.alt"
      })
    },
    metaData: {
      ...normalizedData.metaData,
      componentName: `XStage`,
      fileUrl: generateComponentUrl(`components`, `XStage`)
    }
  };

  return mappedData;
};
