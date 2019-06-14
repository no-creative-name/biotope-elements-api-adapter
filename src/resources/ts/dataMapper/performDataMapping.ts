import { Content } from "../interfaces/Content";
import { primaryCtaMapper } from "./primaryCTA/mapper";
import { leadTextMapper } from "./leadText/mapper";
import { imageTextMapper } from "./imageText/mapper";
import { accordionContainerMapper } from "./accordionContainer/mapper";
import { accordionItemMapper } from "./accordionItem/mapper";
import { contentBoxMapper } from "./contentBox/mapper";
import { dropdownMapper } from "./dropdown/mapper";
import { stageMapper } from "./stage/mapper";

const contentTypeComponentMap = {
  leadText: leadTextMapper,
  imageText: imageTextMapper,
  primaryCTA: primaryCtaMapper,
  accordionContainer: accordionContainerMapper,
  accordionItem: accordionItemMapper,
  contentBox: contentBoxMapper,
  dropdown: dropdownMapper,
  stage: stageMapper
};

export const mapData = content => {
  let componentMapper =
    contentTypeComponentMap[content.metaData.componentIdentifier];
  if (componentMapper !== undefined) {
    return componentMapper({ ...content });
  }

  return content;
};

const updateDataForComponent = () => {
  return (content: Content) => {
    let mappedData = mapData(content);

    return mappedData;
  };
};

const performDataMapping = async (contents: any) => {
  return contents.children.map(updateDataForComponent());
};

export default performDataMapping;
