import { access } from "fs";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";

const getDataByContentId = async (
  contentId: string,
  nestedLevel: number = 0
) => {
  const query = `
  fragment fields on ImageTextComponent {
    image {
      title
      url
    }
    text
  }

  fragment teaser on TeaserComponent {
    heading
    teaserItemsCollection {
      items {
        headline
        url
        linklabel
        text
      }
    }
  }
{
  pageTestGraphql(id: "${contentId}") {
      title
      componentsCollection(limit: 10) {
        items {
          __typename
          ...fields
          __typename
          ...teaser
        }
      }
    }
  }
  `
  let page: string;
  const normalizedItems = await fetch(CMSAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ACCESSTOKEN}`
    },
    body: JSON.stringify({query})
  })
  .then(response => response.json())
  .then((responseJson) => {
    page = responseJson.data.pageTestGraphql.title;
    const items = responseJson.data.pageTestGraphql.componentsCollection.items;
    return items.map(item => {
      return {
        data: item,
        metaData: {
          componentIdentifier: item.__typename,
          id: item.__typename
        }
      }
    })
  });

  return {
    title: page,
    breadcrumb: '',
    children: normalizedItems
  }
};

export default getDataByContentId;
