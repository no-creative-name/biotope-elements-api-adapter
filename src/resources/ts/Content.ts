export interface Content {
  metaData: MetaData;
  data: ContentData;
}
interface MetaData {
  componentIdentifier: string;
  id: number;
}

interface ContentData {
  children?: Content[];
}
