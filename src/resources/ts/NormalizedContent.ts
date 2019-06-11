// export interface NormalizedContent<Content> {
// 	id: number;
// 	contentType: string;
// 	data: Content;
// }

export interface NormalizedContent {
    metaData: MetaData,
    data: ContentData
}
interface MetaData {
    componentIdentifier: string,
    componentName: string,
    id: number,
    fileUrl: string
}

interface ContentData {
    children?: NormalizedContent[]
}