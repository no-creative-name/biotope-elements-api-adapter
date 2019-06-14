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

  const pageQuery = gql`
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
      query: pageQuery
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

const buildComponentQuery = (
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
      return await getDataForMeta(child);
    })
  );
  return normalizedChildrenData;
};

const getDataForMeta = meta => {
  return client
    .query({
      query: buildComponentQuery(
        meta.componentIdentifier,
        meta.id,
        attributeMap[meta.componentIdentifier].attributes
      )
    })
    .then(async result => {
      const data = result.data[meta.componentIdentifier];
      data["children"] = [];
      delete data.__typename;

      const childrenInformation =
        attributeMap[meta.componentIdentifier].children;

      if (childrenInformation) {
        const childrenData = [].concat(
          data[childrenInformation.fieldIdentifier]
        );
        let normalizedChildrenData = await normalizeChildrenData(
          childrenData,
          childrenInformation.componentIdentifier
        );
        data["children"] = normalizedChildrenData;
      }

      if (attributeMap[meta.componentIdentifier].slotAttributes) {
        const slotAttributes =
          attributeMap[meta.componentIdentifier].slotAttributes;

        const childrenData = generateChildrenByAttributes(slotAttributes, data);

        data["children"].concat(childrenData);
      }

      return {
        data: data,
        metaData: {
          componentIdentifier: meta.componentIdentifier,
          id: meta.id
        }
      };
    });
};

const normalizeChildrenData = (grandChildrenData, componentIdentifier) => {
  return Promise.all(
    grandChildrenData.map(async grandChildData => {
      grandChildData["componentIdentifier"] = componentIdentifier;

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

      return await getDataForMeta(grandChildData);
    })
  );
};

const generateChildrenByAttributes = (slotAttributes, parentData) => {
  return slotAttributes.map(slotAttribute => {
    const slottedIdentifier = slotAttribute.slottedIdentifier;
    const attributes = slotAttribute.attributes;

    let data = {};

    attributes.map(attribute => {
      data[attribute] = parentData[attribute];
    });

    const grandChildData = {
      data: data,
      metaData: {
        componentIdentifier: slottedIdentifier,
        id: "---"
      }
    };
    return grandChildData;
  });
};

export default getDataByContentId;
