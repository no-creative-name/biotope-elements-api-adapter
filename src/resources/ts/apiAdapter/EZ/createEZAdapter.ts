import { CMSAdapter } from "../CMSAdapter";
import { EZPage } from "./interfaces/EZPage";
import getDataByContentId from "./getDataByContentId";

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
