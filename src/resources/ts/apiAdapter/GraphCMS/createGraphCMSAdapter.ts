import { CMSAdapter } from "../CMSAdapter";
import { Page } from "../../Page";
import getDataByContentId from "./getDataByContentId";
import { GraphCMSPage } from "./interfaces/GraphCMSPage";

const createEZAdapter = (): CMSAdapter => {
  return {
    getPageData: async (pageId: number) => {
      const pageData: GraphCMSPage = await getDataByContentId(pageId);

      return {
        title: pageData.title,
        breadcrumb: pageData.breadcrumb,
        children: pageData.children
      };
    }
  };
};

export default createEZAdapter;
