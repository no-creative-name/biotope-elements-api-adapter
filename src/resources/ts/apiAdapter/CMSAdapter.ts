import { Page } from "../Page";

export interface CMSAdapter {
  getPageData: (pageId: number) => Promise<Page>;
}
