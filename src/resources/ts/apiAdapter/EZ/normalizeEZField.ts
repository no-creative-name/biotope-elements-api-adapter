import {
  getContentTypeAndId,
  getLocation,
  getSystemUrl,
  getContentForContentId,
  getFieldFromName,
  convertTimestampToDDMMYYYY,
  convertRichTextToJSON,
  getContentTypeObjectForContentId,
  getContentId,
  getObjectForContentId
} from "../../helpers/cmsHelpers";

export const normalizeEZField = async (
  ezFieldType: string,
  contentObject: any,
  fieldName: string,
  fieldValue: any,
  pageId: string
) => {
  switch (ezFieldType) {
    case "ezselection":
      const contentId = (await getContentTypeAndId(contentObject)).id;
      let contentTypeInfo = await getContentTypeObjectForContentId(contentId);

      const contentFieldInfo =
        contentTypeInfo.ContentType.FieldDefinitions.FieldDefinition;

      let correctField = contentFieldInfo.find(field => {
        return (
          fieldName === field.identifier &&
          field.fieldSettings.options[fieldValue]
        );
      });

      if (correctField) {
        return correctField.fieldSettings.options[fieldValue].toLowerCase();
      }
      return "";
    case "ezobjectrelationlist":
      if (fieldValue.destinationContentIds.length) {
        const locations = await getLocation(
          fieldValue.destinationContentIds[0]
        );
        const reversedLocations = [...locations].reverse();

        let closestPage;
        for (const locationStep of reversedLocations) {
          if (parseInt(locationStep)) {
            const contentId = await getContentId(parseInt(locationStep));
            if (contentId != 0) {
              const contentType = (await getContentTypeAndId(
                await getObjectForContentId(contentId)
              )).contentType;
              if (contentType == "page") {
                closestPage = locationStep;
                break;
              }
            }
          }
        }

        if (closestPage == (await getLocation(pageId)).pop()) {
          return `#jumpmark-${fieldValue.destinationContentIds[0]}`;
        }
        return await getSystemUrl(locations.pop());
      }
      return "";
    case "ezrichtext":
      return await convertRichTextToJSON(fieldValue.xhtml5edit);
    case "ezimageasset":
      if (fieldValue.destinationContentId != null) {
        const contentId = fieldValue.destinationContentId;
        const imageObject = await getContentForContentId(contentId);

        const image = {
          url: `${CMSAPI}${
            getFieldFromName(imageObject, "image").fieldValue.uri
          }`,
          altText: fieldValue.alternativeText
        };
        return image;
      }
      return {
        url: "",
        altText: ""
      };
    case "ezdate":
      if (fieldValue != null) {
        return convertTimestampToDDMMYYYY(fieldValue.timestamp);
      }
      return "";
  }
  return fieldValue;
};
