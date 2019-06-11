import { NormalizedContent } from '../../../NormalizedContent';
export interface EZPage {
  title: string;
  breadcrumb?: string;
  children: NormalizedContent[];
}
