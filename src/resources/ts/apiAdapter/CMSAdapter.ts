import { Page } from "../interfaces/Page";

export interface CMSAdapter {
  getPageData: (pageId: number) => Promise<Page>;
}
