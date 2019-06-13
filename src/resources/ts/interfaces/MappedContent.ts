export interface MappedContent {
  metaData: MappedMetaData;
  data: MappedContentData;
}
interface MappedMetaData {
  componentIdentifier: string;
  componentName: string;
  id: number;
  fileUrl: string;
}

interface MappedContentData {
  children?: MappedContent[];
}
