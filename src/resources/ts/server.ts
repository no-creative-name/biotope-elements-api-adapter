import setupResourceLoader from "./resourceLoader";

import { renderContentsToPage } from "./render/renderContentsToPage";

const init = async (data: any, options: any) => {
  const pageId: number = options.versionUrl.split("/")[6];

  await renderContentsToPage(pageId);

  setupResourceLoader();
};

// Entrypoint
window["biotope"] = window["biotope"] || {};
window["biotope"].render = init;
