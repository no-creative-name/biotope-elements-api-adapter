import { access } from "fs";

const getDataByContentId = async (
  contentId: number,
  nestedLevel: number = 0
) => {
  const query = `
    fragment fields on ImageTextComponent {
      image {
        contentType
        title
      }
      text
    }

    fragment stage on Stage {
      backgroundImage {
        url
      }
    }
    {
    pageTestGraphqlCollection {
      items {
        title
        componentsCollection(limit: 10) {
          items {
            __typename
            ...fields
            __typename
            ...stage
          }
        }
      }
    }
  }
  `

  fetch(CMSAPI, {
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
    console.log(responseJson)
  });

  return {
    title: '',
    items:[]
  }
};

export default getDataByContentId;
