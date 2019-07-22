import { getNodeIndex, getSelector } from './selector'

/**
 * getParents
 * @param {HTMLElement} element
 * @param {Array<{tagName: string, path: string}>} path
 */
export function getParents(element, path) {
	if (element.tagName === 'BODY') {
		path.push({tagName: 'body', path: 'body'})
		const {paths} = [...path].reverse().reduce((acc, p) => {
			const selector = acc.lastSelector ? acc.lastSelector + '>' + p.path : p.path
			const ps = [...acc.paths, {tagName: p.tagName, path: selector}]
			return {
				lastSelector: selector,
				paths: ps,
			}
		}, {lastSelector: '', paths: []})
		return paths
	}
	var index = getNodeIndex(element)
	if (element.id) {
		path.push({
			tagName: element.tagName.toLowerCase(),
			path: `#${element.id}${element.className ? '.' + element.className : ''}`,
		})
	} else {
		path.push({
			tagName: element.tagName.toLowerCase(),
			path: `:nth-child(${index + 1})`,
		})
	}
	return getParents(element.parentElement, path)
}

/**
 * getSiblings
 * @param {HTMLElement} element
 */
export function getSiblings(element) {
	const elementSelector = getSelector(element, [])
	return Array.from(element.parentElement.children).map((element) => {
		return {
			tagName: element.tagName,
			path: getSelector(element, []),
		}
	}).filter(({path}) => {
		return path !== elementSelector
	})
}

/**
 * getChildren
 * @param {HTMLElement} element
 */
export function getChildren(element) {
	return Array.from(element.children).map((element) => {
		return {
			tagName: element.tagName,
			path: getSelector(element, []),
		}
	})
}