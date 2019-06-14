import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const accordionContainerMapper: DataMapper = normalizedData => {
  const mappedData = {
    data: {
      ...normalizedData.data,
      ...mapChildren(normalizedData.data),
      class:
        "component-spacing-top component-spacing-bottom row row--reducedWidth"
    },
    metaData: {
      ...normalizedData.metaData,
      componentName: `XAccordion`,
      fileUrl: generateComponentUrl(`components`, `XAccordion`)
    }
  };
  return mappedData;
};
