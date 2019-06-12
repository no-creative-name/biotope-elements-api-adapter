import { Content } from "../../../Content";
export interface GraphCMSPage {
  title: string;
  breadcrumb?: string;
  children: Content[];
}
