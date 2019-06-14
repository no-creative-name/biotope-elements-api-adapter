import { mapData } from "./performDataMapping";

export const mapChildren = (data: any, propertyToMap: string = "children") => {
  if (data.children !== undefined) {
    const obj = {};
    obj[propertyToMap] = data.children.map(mapData);
    return obj;
  }
  return {};
};
