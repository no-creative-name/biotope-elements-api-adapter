import { Content } from "../../../Content";
export interface EZPage {
  title: string;
  breadcrumb?: string;
  children: Content[];
}
