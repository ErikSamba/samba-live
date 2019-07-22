/**
 * getNodeIndex
 * @param {Element} element
 */
export function getNodeIndex (element) {
	return Array.from(element.parentNode.childNodes).indexOf(element)
}

/**
 * createSelector
 * @param {string[]} path
 */
export function createSelector(path) {
	return [...path].reverse().join('>')
}

/**
 * getSelector
 * @param {Element} element
 * @param {string[]} path
 */
export function getSelector(element, path) {
	if (element.id || element.tagName === 'BODY') {
		path.push(element.id ? `#${element.id}` : 'body')
		return createSelector(path)
	}
	var index = getNodeIndex(element)
	path.push(`:nth-child(${index + 1})`)
	return getSelector(element.parentElement, path)
}