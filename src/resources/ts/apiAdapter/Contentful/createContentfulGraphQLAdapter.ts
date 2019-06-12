import { CMSAdapter } from "../CMSAdapter";
import { Page } from "../../Page";
import getDataByContentId from "./getDataByContentId";

const createContentfulGraphQLAdapter = (): CMSAdapter => {
  return {
    getPageData: async (pageId: string) => {
      const pageData: Page = await getDataByContentId(pageId);

      return {
        title: pageData.title,
        breadcrumb: pageData.breadcrumb,
        children: pageData.children
      };
    }
  };
};

export default createContentfulGraphQLAdapter;
