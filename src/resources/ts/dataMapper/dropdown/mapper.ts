import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const dropwdownMapper: DataMapper = normalizedData => {
  const mappedData = {
    data: {
      ...normalizedData.data
    },
    metaData: {
      ...normalizedData.metaData,
      componentName: `Dropdown`,
      fileUrl: generateComponentUrl(`components`, `XDropdown`)
    }
  };

  return mappedData;
};
