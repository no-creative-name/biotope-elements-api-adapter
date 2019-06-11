import { getDataForFile } from "./getDataForFile";

const LINK_TYPES = {
	INTERNAL: 0,
	EXTERNAL: 1,
	JUMPMARK: 2
}

export const getFieldFromName = (context, name) => context.find((element: any) => element.fieldDefinitionIdentifier === name);

export const getSystemUrl = async (location: string) => {
	let url = `${EZAPI}/api/ezp/v2/content/locations/1/2/${location}/urlaliases?custom=false`;
	const urlId = await fetch(url, {
		headers: {
			Accept: 'application/vnd.ez.api.Content+json'
		}
	}).then(res => res.json()).then(json => {
		try {
			return json.UrlAliasRefList.UrlAlias[0]._href
		} catch (error) {
			return error
		}
	}).catch(err => err);
	url = `${EZAPI}${urlId}`
	return fetch(url, {
		headers: {
			Accept: 'application/vnd.ez.api.Content+json'
		}
	}).then(res => res.json()).then(json => {
		try {
			return json.UrlAlias.path
		} catch (error) {
			return error
		}
	}).catch(err => {
		if (DEBUG) {
			console.log(err);
		}
		return err
	});
}

export const getContentId = (locationId: number) => {
	const url = `${EZAPI}/api/ezp/v2/content/locations?id=${locationId}`
	return fetch(url, {
		headers: {
			Accept: 'application/vnd.ez.api.ContentInfo+json'
		}
	}).then((res) => {
		if (!res.ok) {
			console.warn('Content on location not found, please check internal links')
		}
		else {
			return res
		}
	}).then(res => res.json()).then((json) => {
		try {
			const id = json.Location.ContentInfo.Content._id
			return id;
		} catch (error) {
			return error
		}
	}).catch(err => err);
}

export const getLocation = (contentId: number) => {
	const url = `${EZAPI}/api/ezp/v2/content/objects/${contentId}/locations`;
	return fetch(url, {
		headers: {
			Accept: 'application/vnd.ez.api.Content+json'
		}
	}).then(res => res.json()).then((json) => {
		try {
			const loc = json.LocationList.Location[0]._href.split('/').splice(8)
			return loc;
		} catch (error) {
			return error
		}
	}).catch(err => err);
}

export const getObjectForContentId = (contentId: number) => {
	const url = `${EZAPI}/api/ezp/v2/content/objects/${contentId}`
	return fetch(url, {
		headers: {
			Accept: 'application/vnd.ez.api.Content+json'
		}
	}).then(res => res.json()).then((json) => {
		try {
			return json;
		} catch (error) {
			return error
		}
	}).catch(err => err);
}

export const getContentTypeObjectForContentId = (contentId: number) => {
	const url = `${EZAPI}/api/ezp/v2/content/types/${contentId}`
	return fetch(url, {
		headers: {
			Accept: 'application/vnd.ez.api.ContentInfo+json'
		}
	}).then(res => res.json()).then((json) => {
		try {
			return json;
		} catch (error) {
			return error
		}
	}).catch(err => err);
}

export const getContentForContentId = async (contentId: number) => {
	try {
		const json = await getObjectForContentId(contentId);
		const content = json.Content.CurrentVersion.Version.Fields.field
		return content;
	} catch (error) {
		return error
	}
}

export const convertTimestampToDDMMYYYY = (timestamp: number) => {
	const date = new Date(timestamp * 1000);

	const day = date.getDate().toString().length == 1 ? `0${date.getDate()}` : date.getDate();
	const month = date.getMonth().toString().length == 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
	return `${day}.${month}.${date.getFullYear()}`;
}

export const getButtonData = async (button) => {
	let type, title, url, target;

	if (getFieldFromName(button, 'module_object')) {
		type = LINK_TYPES.JUMPMARK;
	}
	else if (getFieldFromName(button, 'page_object')) {
		type = LINK_TYPES.INTERNAL;
	}
	else if (getFieldFromName(button, 'link')) {
		type = LINK_TYPES.EXTERNAL;
	}

	if (type == LINK_TYPES.JUMPMARK) {
		title = getFieldFromName(button, 'label').fieldValue;
		url = '#jumpmark-' + getFieldFromName(button, 'module_object').fieldValue.destinationContentId;
	}
	else if (type == LINK_TYPES.INTERNAL) {
		const referenceId = getFieldFromName(button, 'page_object').fieldValue.destinationContentId;

		title = getFieldFromName(button, 'label').fieldValue;
		let locations = await getLocation(referenceId);
		url = await getSystemUrl(locations.pop());
	}
	else if (type == LINK_TYPES.EXTERNAL) {
		title = getFieldFromName(button, 'link').fieldValue.text;
		url = getFieldFromName(button, 'link').fieldValue.link;
		target = getFieldFromName(button, 'target_blank').fieldValue ? '_blank' : '';
	}

	return { title: title, url: url, target: target }
}

// Parses a snippet of HTML for elements of a specific tag and replaces them with divs. Also sets a class to those divs.
export const convertHTMLTagToDiv = (htmlText, htmlTag, divClass) => {
	let temp = document.createElement('div');
	temp.innerHTML = htmlText;
	let elements = [].slice.call(temp.getElementsByTagName(htmlTag));

	for (let element of elements) {
		let newDiv = document.createElement('div');
		newDiv.innerHTML = element.innerHtml;
		newDiv.classList.add(divClass);
	}
	htmlText = htmlText.replace(`<${htmlTag}>`, `<div class="${divClass}">`);
	htmlText = htmlText.replace(`</${htmlTag}>`, `</div>`);

	return htmlText;
}

export const getSubItemsForMainLocation = async (mainLocation) => {
	mainLocation += '/children?limit=-1';

	// fetch location list of component
	let locationList;
	const url = `${EZAPI}${mainLocation}`
	const d = await fetch(url, {
		headers: {
			Accept: 'application/vnd.ez.api.Content+json',
		},
	}).then(res => res.json()).then((json) => {
		try {
			locationList = json.LocationList;
		} catch (error) {
			return error
		}
	}).catch(err => err);

	let subItems = await Promise.all(
		locationList.Location.map(async (element: any) => {

			// fetch locations of sub-items
			let location;
			let url = `${EZAPI}${element._href}`
			return fetch(url, {
				headers: {
					Accept: 'application/vnd.ez.api.Content+json'
				}
			}).then(res => res.json()).then(async (json) => {
				try {
					// fetch sub-items themselves / content
					location = json.Location.Content._href

					url = `${EZAPI}${location}`
					let contentData = await fetch(url, {
						headers: {
							Accept: 'application/vnd.ez.api.Content+json'
						}
					}).then(res => res.json()).then((content) => {
						try {
							content.priority = json.Location.priority;
							return content;

						} catch (error) {
							return error
						}
					}).catch(err => err);

					return contentData;
				} catch (error) {
					return error
				}
			}).catch(err => err);
		})
	);
	if (Array.isArray(subItems)) {
		subItems.sort((a: any, b: any) => {
			if (a.priority < b.priority) {
				return -1;
			}
			else {
				return 1;
			}
		});
	}
	return subItems;
}

export const getContentTypeAndId = async (contentData: any) => {
	try {
		const contentTypeHref = contentData.Content.ContentType._href;
		const url = `${EZAPI}${contentTypeHref}`
		return await fetch(url, {
			headers: {
				Accept: 'application/vnd.ez.api.ContentInfo+json'
			}
		}).then(res => res.json()).then(async (json) => {
			try {
				const contentType = json.ContentType.identifier
				const id = json.ContentType.id

				return {
					contentType,
					id
				}
			} catch (error) {
				return error
			}
		}).catch(err => err);
	} catch (error) {
		return error
	}
}

const beautifyJSON = async (data) => {
	return await Promise.all(

		// add attributes to element object
		data.map(async (child) => {
			let attributeObject: any = {};
			if (child.attributes) {
				await Promise.all(
					child.attributes.map(async (attribute) => {
						let value = attribute.value;

						// if attribute is href to ezlocation, replace with url
						if (attribute.value.indexOf('ezlocation') != -1) {
							const locationId = attribute.value.substring(13);
							const contentId = await getContentId(locationId);
							const linkedContent = await getObjectForContentId(contentId);
							const contentType = (await getContentTypeAndId(linkedContent)).contentType;
							if (contentType == 'file') {
								value = (await getDataForFile(contentId)).url
							}
							else if (contentType.indexOf('page') != -1) {
								let url = await getSystemUrl(locationId);
								url = `${EZAPI}${url}`;
								value = url;
							}
						}
						attributeObject[attribute.key] = value;
					})
				)
			}

			return {
				type: child.type,
				...child.attributes !== undefined && { attributes: attributeObject },
				...child.tagName !== undefined && { tagName: child.tagName },
				...child.content !== undefined && { content: child.content },
				...child.children !== undefined && { children: await beautifyJSON(child.children) }
			}
		})
	)
}

export const convertRichTextToJSON = async (html) => {
	const parse = require('himalaya').parse;
	const data = parse(html);

	const richTextData = <any>await beautifyJSON(data);

	return richTextData[1].children;
}

export const resolveLink = async (data: any, otps: any) => {
	const defaults = {
		linkTitle: 'link_title',
		linkInternal: 'link_internal',
		linkExternal: 'link_external',
		linkTarget: 'link_target_blank',
		linkJumpmark: 'link_jumpmark',
	}

	const options = {
		...defaults,
		...otps,
	}
	let link = getFieldFromName(data, options.linkExternal).fieldValue;
	const isJumpmark = getFieldFromName(data, options.linkJumpmark).fieldValue;
	if (link === null) {
		const rel = getFieldFromName(data, options.linkInternal).fieldValue.destinationContentIds;
		if (rel.length !== 0) {
			if (isJumpmark) {
				link = `#jumpmark-${rel[0]}`;
			} else {
				try {
					const location = await getLocation(rel[0]);
					const systemUrl = await getSystemUrl(location.join('/'));
					link = systemUrl;
				} catch (error) {
					console.log(error);
				}
			}

		}
	}
	const title = getFieldFromName(data, options.linkTitle).fieldValue;
	let isTargetBlank = getFieldFromName(data, options.linkTarget).fieldValue;
	if (isJumpmark) {
		isTargetBlank = false;
	}
	return {
		link,
		title,
		target: isTargetBlank ? '_blank' : '_self',
	}
}

export const resolveImage = async (context, term = 'image') => {
	const val = getFieldFromName(context, term).fieldValue;
	if (val === null) {
		return null;
	}
	const imageID = val.destinationContentId;
	const imgData = await getContentForContentId(imageID);
	const imageUrl = getFieldFromName(imgData, 'image').fieldValue.uri;

	return {
		url: `${EZAPI}${imageUrl}`,
		alt: val.alternativeText,
	}
}
