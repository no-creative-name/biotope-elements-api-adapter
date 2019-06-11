import {
  getObjectForContentId,
  getSubItemsForMainLocation
} from "./helpers/cmsHelpers";

export const getModules = async pageId => {
  const pageData = await getObjectForContentId(pageId);
  const subItems = await getSubItemsForMainLocation(
    pageData.Content.MainLocation._href
  );
  let contentIds = [];
  subItems.map((subItem: any) => {
    contentIds.push(subItem.Content._href.split(/[\s/]+/).pop());
  });

  return await Promise.all(
    contentIds.map(async (contentId: any) => {
      const url = `${CMSAPI}/api/ezp/v2/content/objects/${contentId}`;
      return fetch(url, {
        headers: {
          Accept: "application/vnd.ez.api.Content+json"
        }
      })
        .then(res => res.json())
        .then(async json => {
          try {
            const contentTypeHref = json.Content.ContentType._href;
            const url = `${CMSAPI}${contentTypeHref}`;
            const contentType = await fetch(url, {
              headers: {
                Accept: "application/vnd.ez.api.ContentInfo+json"
              }
            })
              .then(res => res.json())
              .then(async json => {
                try {
                  const identifier = json.ContentType.identifier;
                  const id = json.ContentType.id;
                  const context = json.ContentType;
                  return {
                    id,
                    identifier,
                    context
                  };
                } catch (error) {
                  return error;
                }
              })
              .catch(err => err);
            const id = json.Content._id;
            const context = json.Content;
            return {
              id,
              context,
              contentType
            };
          } catch (error) {
            return error;
          }
        })
        .catch(err => err);
    })
  ).catch(err => {
    if (DEBUG) {
      console.log(err);
    }
  });
};
