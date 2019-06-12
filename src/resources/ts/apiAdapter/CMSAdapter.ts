import { Page } from "../Page";

export interface CMSAdapter {
  getPageData: (pageId: string) => Promise<Page>;
}
