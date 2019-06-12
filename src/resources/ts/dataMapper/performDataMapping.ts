import { NormalizedContent } from "../NormalizedContent";
import { accordionMapper } from "./accordion/mapper";
import { accordionItemMapper } from "./accordionItem/mapper";
import { downloadListMapper } from "./downloadList/mapper";
import { textMediaInlineMapper } from "./textMediaInline/mapper";
import { articleTileMapper } from "./articleTile/mapper";
import { articleTileItemMapper } from "./articleTileItem/mapper";
import { primaryCtaMapper } from "./primaryCTA/mapper";
import { secondaryCtaMapper } from "./secondaryCTA/mapper";
import { leadTextMapper } from "./leadText/mapper";
import { imageTextMapper } from "./imageText/mapper";
import { fileMapper } from "./file/mapper";
import { genericListMapper } from "./genericList/mapper";
import { genericListItemMapper } from "./genericListItem/mapper";
import { sliderMapper } from "./slider/mapper";
import { sliderItemMapper } from "./sliderItem/mapper";
import { stageMapper } from "./stage/mapper";
import { tabContainerMapper } from "./tabContainer/mapper";
import { tabItemMapper } from "./tabItem/mapper";
import { routingTeaserMapper } from "./routingTeaser/mapper";
import { routingTeaserItemMapper } from "./routingTeaserItem/mapper";
import { teaserRowMapper } from "./teaserRow/mapper";
import { teaserRowItemMapper } from "./teaserRowItem/mapper";

const contentTypeComponentMap = {
  leadText: leadTextMapper,
  imageText: imageTextMapper
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
  return (content: NormalizedContent) => {
    let mappedData = mapData(content);

    return mappedData;
  };
};

const performDataMapping = async (contents: any) => {
  console.log(contents);

  return contents.children.map(updateDataForComponent());
};

export default performDataMapping;
