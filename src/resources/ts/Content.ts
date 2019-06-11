export interface Content {
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
    children?: Content[]
}