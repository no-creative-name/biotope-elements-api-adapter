import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { renameGeneralProps } from "../renameGeneralProps";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const dropdownMapper: DataMapper = normalizedData => {
  const mappedData = {
    data: {
      ...renameGeneralProps(normalizedData.data, {
        "dropdown-options": "options"
      })
    },
    metaData: {
      ...normalizedData.metaData,
      componentName: `XDropdown`,
      fileUrl: generateComponentUrl(`components`, `XDropdown`)
    }
  };

  return mappedData;
};
