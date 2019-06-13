import { generateComponentNameFromString } from "./generateComponentNameFromString";
import { generateScaffolding } from "./generateScaffolding";

const renderChildren = data => {
  if (data.children) {
    let childrenMarkup = "";

    data.children.map(child => {
      if (child != undefined) {
        childrenMarkup += generateWebComponentTags(child);
      }
    });
    return childrenMarkup;
  }
  return "";
};

export const generateWebComponentTags = (child: any) => {
  const { data, metaData } = child;
  const attributes = Object.keys(data)
    .map(key => {
      if (key !== "children") {
        if (typeof data[key] === "string") {
          return `${key}='${data[key]}'`;
        } else if (typeof data[key] === "boolean" && data[key]) {
          return `${key}`;
        } else if (typeof data[key] === "object") {
          return `${key}='${JSON.stringify(data[key])}'`;
        }
      }
      return "";
    })
    .join(" ");

  let deps: any = [];
  if (metaData.dependencies) {
    deps = metaData.dependencies.map(dep => `'${dep}'`).join(",");
  }

  const scaffolding = generateScaffolding(metaData);

  return `${scaffolding.before}<${generateComponentNameFromString(
    metaData.componentName
  )}
        data-resources="[
            {
                paths: ['${metaData.fileUrl}'],
                dependsOn: [${deps}]
            }
        ]"
        id="jumpmark-${metaData.id}"
        ${attributes}
        componentId="${metaData.id}"
    >${renderChildren(data)}</${generateComponentNameFromString(
    metaData.componentName
  )}>${scaffolding.after}`;
};
