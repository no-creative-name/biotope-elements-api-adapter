import setupResourceLoader from "./resourceLoader";

import { renderContentsToPage } from "./render/renderContentsToPage";

const init = async (data: any, options: any) => {
  let pageId: string;
  pageId = options.pageId;

  await renderContentsToPage(pageId);

  setupResourceLoader();
};

// Entrypoint
window["biotope"] = window["biotope"] || {};
window["biotope"].render = init;
