const getDataByContentId = async (
  contentId: number,
  nestedLevel: number = 0
) => {
  const query = `
    {
      pageBy(id: "cGFnZToy") {
        slug
      }
    }
  `
  console.log("TCL: query", query)


  fetch(CMSAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
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
