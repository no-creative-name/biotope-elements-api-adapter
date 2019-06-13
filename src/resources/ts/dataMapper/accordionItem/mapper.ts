import { generateComponentUrl } from "../../render/tagCreation/generateComponentUrl";
import { DataMapper } from "../DataMapper";
import { mapChildren } from "../mapChildren";

export const accordionItemMapper: DataMapper = normalizedData => {
  const mappedData = {
    data: {
      ...normalizedData.data,
      ...mapChildren(normalizedData.data)
    },
    metaData: {
      ...normalizedData.metaData,
      componentName: `XAccordionItem`,
      fileUrl: generateComponentUrl(`components`, `XAccordion/XAccordionItem`)
    }
  };
  return mappedData;
};
