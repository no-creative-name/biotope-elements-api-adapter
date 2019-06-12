import { Page } from "../Page";
import createEZAdapter from "../apiAdapter/EZ/createEZAdapter";
import createContentfulAdapter from "../apiAdapter/Contentful/createContentfulGraphQLAdapter";
import performDataMapping from "../dataMapper/performDataMapping";
import { generateWebComponentTags } from "./tagCreation/generateWebComponentTags";
import createHtmlElementFromString from "./tagCreation/createHtmlElementFromString";
import { NormalizedContent } from "../NormalizedContent";

const CMS_ADAPTER_MAP = {
  EZ: createEZAdapter(),
  Contentful: createContentfulAdapter()
};

export const renderContentsToPage = async (pageId: string) => {
  const apiAdapter = CMS_ADAPTER_MAP[CMS_ADAPTER];

  const normalizedPage: Page = await apiAdapter.getPageData(pageId);

  const mapData = await performDataMapping(normalizedPage);
  normalizedPage.children = mapData;

  const root: HTMLElement = document.getElementById("main");
  document.title = normalizedPage.title;

  const elements = normalizedPage.children.map(
    (child: NormalizedContent, index: number) => {
      return generateWebComponentTags(child);
    }
  );

  await elements.map(async (element, index) => {
    root.appendChild(createHtmlElementFromString(element as any));
  });
};
