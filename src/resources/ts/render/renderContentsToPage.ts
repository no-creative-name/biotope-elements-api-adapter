import { Page } from "../Page";
import createEZAdapter from "../apiAdapter/EZ/createEZAdapter";
import createGraphCMSAdapter from "../apiAdapter/GraphCMS/createGraphCMSAdapter";
import performDataMapping from "../dataMapper/performDataMapping";
import { generateWebComponentTags } from "./tagCreation/generateWebComponentTags";
import createHtmlElementFromString from "./tagCreation/createHtmlElementFromString";
import { MappedContent } from "../MappedContent";

const CMS_ADAPTER_MAP = {
  EZ: createEZAdapter(),
  GraphCMS: createGraphCMSAdapter()
};

export const renderContentsToPage = async (pageId: number) => {
  const apiAdapter = CMS_ADAPTER_MAP[CMS_ADAPTER];

  const normalizedPage: Page = await apiAdapter.getPageData(pageId);

  const mapData: MappedContent[] = await performDataMapping(normalizedPage);
  normalizedPage.children = mapData;

  const root: HTMLElement = document.getElementById("main");
  document.title = normalizedPage.title;

  const elements = normalizedPage.children.map(
    (child: MappedContent, index: number) => {
      return generateWebComponentTags(child);
    }
  );

  await elements.map(async (element, index) => {
    root.appendChild(createHtmlElementFromString(element as any));
  });
};
