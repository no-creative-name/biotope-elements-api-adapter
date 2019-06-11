import { Content } from './Content';

export interface Page {
	title: string;
	breadcrumb?: string;
	children: Content[]
}