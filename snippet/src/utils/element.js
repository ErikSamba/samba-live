/**
 * style element
 * @param {HTMLElement} element
 * @param {Record<string, any>} styles
 */
export function styleElement(element, styles) {
	Object.entries(styles).forEach(([key, value]) => {
		element.style[key] = value
	})
}

export function generateId() {
	return `samba-element-${+new Date()}`
}

/**
 * create HTML element
 * @param {{
 * 	tagName: string,
 * 	styles: Record<string, any>,
 * 	id?: string,
 * 	appendToDocument?: boolean,
 * }} payload
 * @return {{
 * 	show: () => void,
 * 	hide: () => void,
 * 	setStyle: (styles: Record<string, any>) => void,
 * 	getElement: () => HTMLElement,
 * 	id: string,
 * }}
 */
export function createElement({tagName, id, styles, appendToDocument}) {
	const element = document.createElement(tagName)
	element.id = id || generateId()
	styleElement(element, styles)
	if (appendToDocument) {
		document.body.append(element)
	}
	return {
		id: element.id,
		getElement: () => element,
		show: () => { element.style.display = 'block' },
		hide: () => { element.style.display = 'none' },
		setStyle: (styles) => {styleElement(element, styles)}
	}
}

