import ApolloClient, { gql } from "apollo-boost";
import { attributeMap } from "./attributeMap";

const client = new ApolloClient({
  uri: CMSAPI
});

const getDataByContentId = async (
  contentId: number,
  nestedLevel: number = 0
) => {
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
        return !attributeMap[componentIdentifier].childOnly
          ? `${componentIdentifier} { id }`
          : ``;
      })}
		}
	}
}
`;

  const componentData = await client
    .query({
      query: initialQuery
    })
    .then(result => {
      pageData.title = result.data.page.title;
      return result.data.page.components;
    });

  const normalizedComponentData = await normalizeContainerComponents(
    componentData
  );

  const newPageData = {
    title: pageData.title,
    children: normalizedComponentData
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

const normalizeContainerComponents = async componentData => {
  let data = {
    children: []
  };
  componentData.map(component => {
    Object.keys(attributeMap).map(componentIdentifier => {
      component[componentIdentifier]
        ? data.children.push({
            id: component[componentIdentifier].id,
            componentIdentifier: componentIdentifier
          })
        : null;
    });
  });

  let normalizedChildrenData = await Promise.all(
    data.children.map(async child => {
      return await normalizeChildData(child);
    })
  );
  return normalizedChildrenData;
};

const normalizeChildData = child => {
  return client
    .query({
      query: getComponentQuery(
        child.componentIdentifier,
        child.id,
        attributeMap[child.componentIdentifier].attributes
      )
    })
    .then(async result => {
      const childData = result.data[child.componentIdentifier];
      delete childData.__typename;

      if (attributeMap[child.componentIdentifier].children) {
        const grandChildrenData = [].concat(
          childData[
            attributeMap[child.componentIdentifier].children.fieldIdentifier
          ]
        );
        let normalizedGrandChildrenData = await normalizeGrandChildrenData(
          grandChildrenData,
          child.componentIdentifier
        );
        childData["children"] = normalizedGrandChildrenData;
      }
      return {
        data: childData,
        metaData: {
          componentIdentifier: child.componentIdentifier,
          id: child.id
        }
      };
    });
};

const normalizeGrandChildrenData = (grandChildrenData, childIdentifier) => {
  return Promise.all(
    grandChildrenData.map(async grandChildData => {
      grandChildData["componentIdentifier"] =
        attributeMap[childIdentifier].children.componentIdentifier;

      if (grandChildData["componentIdentifier"] === "component") {
        const componentData = await client
          .query({
            query: gql`{
				  component(where: {id: "${grandChildData.id}"}) {
					  ${Object.keys(attributeMap).map(componentIdentifier => {
              return !attributeMap[componentIdentifier].childOnly
                ? `${componentIdentifier} { id }`
                : ``;
            })}
				  }
			  }
				`
          })
          .then(result => {
            return result.data.component;
          });
        return (await normalizeContainerComponents(
          [].concat(componentData)
        ))[0];
      }

      return await normalizeChildData(grandChildData);
    })
  );
};

export default getDataByContentId;
