import { CMSAdapter } from "../CMSAdapter";
import getDataByContentId from "./getDataByContentId";
import { EZPage } from "./interfaces/EZPage";

const createEZAdapter = (): CMSAdapter => {
  return {
    getPageData: async (pageId: number) => {
      const pageData: EZPage = await getDataByContentId(pageId);

      return {
        title: pageData.title,
        breadcrumb: pageData.breadcrumb,
        children: pageData.children
      };
    }
  };
};

export default createEZAdapter;
