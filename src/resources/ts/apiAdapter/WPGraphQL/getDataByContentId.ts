import { access } from "fs";

const getDataByContentId = async (
  contentId: number,
  nestedLevel: number = 0
) => {
  const query = `
  {
    imageTextComponent(id: "4eCjYeA2qz696tqN2jQ5Bq") {
      image {
        title
        url
      },
      text
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
    breadcrumb: '',
    children:[]
  }
};

export default getDataByContentId;
