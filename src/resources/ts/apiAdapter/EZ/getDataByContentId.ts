import { getSubItemsForMainLocation, getObjectForContentId, getContentTypeAndId } from '../../helpers/cmsHelpers';
import { normalizeEZField } from './normalizeEZField';
import { getDataForFile } from '../../helpers/getDataForFile';

let pageId;

const getDataByContentId = async (contentId: string, nestedLevel: number = 0) => {
	if (nestedLevel == 0) {
		pageId = contentId;
	}
	const contentObject = await getObjectForContentId(contentId);
	const contentFields = contentObject.Content.CurrentVersion.Version.Fields.field;

	const contentType = (await getContentTypeAndId(contentObject)).contentType;

	const object: any = {}

	await Promise.all(contentFields.map(async (contentField: any) => {
		let fieldName = contentField.fieldDefinitionIdentifier;
		let fieldValue = contentField.fieldValue;
		const ezFieldType = contentField.fieldTypeIdentifier

		fieldValue = await normalizeEZField(ezFieldType, contentObject, fieldName, fieldValue, pageId);

		fieldName = fieldName.replace(/_/g, '-');

		if (typeof fieldValue === 'string') {
			fieldValue = fieldValue.split('\'').join('&#39;');
			fieldValue = fieldValue.split('\"').join('&#34;');
		}

		if (fieldValue !== '' && fieldValue !== null) {
			object[fieldName] = fieldValue;
		}
	}))

	nestedLevel++;

	const contentSubItems = await getSubItemsForMainLocation(contentObject.Content.MainLocation._href);

	const childrenContent = await Promise.all(contentSubItems.map(async (subItem: any, index: number) => {
		const contentInfo = await getContentTypeAndId(subItem);
		const childContentType = contentInfo.contentType;
		const id = subItem.Content._id;

		// check if component is first and/or last sub item of container
		const isFirst = index == 0 ? true : false;
		const isLast = contentSubItems.length == index + 1 ? true : false;

		let data;

		if (childContentType === 'page') {
			data = {};
		}
		else if (childContentType === 'file') {
			data = await getDataForFile(id);
		}
		else {
			data = await getDataByContentId(id, nestedLevel);
		}

		return {
			data,
			metaData: {
				componentIdentifier: childContentType,
				id,
				'is-first': isFirst,
				'is-last': isLast,
				'is-child': true,
				'nested-level': `${nestedLevel - 1}`,
				'parent-identifier': contentType
			}
		}
	}))

	childrenContent.forEach((child, index) => {
		if (child.metaData.componentIdentifier === 'page') {
			childrenContent.splice(index);
		}
	})

	return {
		children: childrenContent,
		...object
	};
}

export default getDataByContentId;