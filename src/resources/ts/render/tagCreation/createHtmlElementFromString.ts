const createHTMLElementFromString = (str: string = '<div></div>'): HTMLElement => {
	const el: HTMLElement = document.createElement('div');
	el.innerHTML = str;
	return el.childNodes[0] as HTMLElement || el;
}

export default createHTMLElementFromString;
