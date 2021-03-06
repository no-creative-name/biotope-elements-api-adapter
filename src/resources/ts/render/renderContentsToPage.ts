import { Page } from "../Page";
import createEZAdapter from "../apiAdapter/EZ/createEZAdapter";
import performDataMapping from "../dataMapper/performDataMapping";
import { generateWebComponentTags } from "./tagCreation/generateWebComponentTags";
import createHtmlElementFromString from "./tagCreation/createHtmlElementFromString";
import { NormalizedContent } from "../NormalizedContent";

export const renderContentsToPage = async (pageId: number) => {
  const apiAdapter = createEZAdapter();

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
