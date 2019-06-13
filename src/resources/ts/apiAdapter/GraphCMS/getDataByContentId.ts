import ApolloClient, { gql } from "apollo-boost";
import { attributeMap } from "./attributeMap";

const getDataByContentId = async (
  contentId: number,
  nestedLevel: number = 0
) => {
  const client = new ApolloClient({
    uri: CMSAPI
  });

  let pageData = {
    title: "",
    children: []
  };

  const initialQuery = gql`
  {
	page(where: {id: "${contentId}"}) {
		title
		components (orderBy: pageOrder_ASC) {
			${Object.keys(attributeMap).map(componentIdentifier => {
        return `${componentIdentifier} { id }`;
      })}
		}
	}
}
`;

  await client
    .query({
      query: initialQuery
    })
    .then(result => {
      pageData.title = result.data.page.title;
      const resultData = result.data.page.components;
      resultData.map(component => {
        Object.keys(attributeMap).map(componentIdentifier => {
          component[componentIdentifier]
            ? pageData.children.push({
                id: component[componentIdentifier].id,
                componentIdentifier: componentIdentifier
              })
            : null;
        });
      });
    });
  let normalizedChildrenData = await Promise.all(
    pageData.children.map(async child => {
      return await client
        .query({
          query: getComponentQuery(
            child.componentIdentifier,
            child.id,
            attributeMap[child.componentIdentifier]
          )
        })
        .then(result => {
          delete result.data[child.componentIdentifier].__typename;
          return {
            data: result.data[child.componentIdentifier],
            metaData: {
              componentIdentifier: child.componentIdentifier,
              id: child.id
            }
          };
        });
    })
  );

  const newPageData = {
    title: pageData.title,
    children: normalizedChildrenData
  };
  return newPageData;
};

const getComponentQuery = (
  componentName: string,
  id: string,
  attributes: {}
) => {
  return gql`
	{
	  ${componentName}(where: {id: "${id}"}) ${attributes}
  }
`;
};
export default getDataByContentId;
