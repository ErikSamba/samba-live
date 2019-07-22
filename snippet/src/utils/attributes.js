import {getSelector} from './selector'
import {getParents, getChildren, getSiblings} from './related'
/**
 * getAttributes
 * @param {any} element
 */
export function getAttributes(element) {
	return {
		selector: getSelector(element, []),
		tagType: element.tagName.toLowerCase(),
		attributes: Object.values(element.attributes)
			.slice(0, element.attributes.length)
			.map((at) => {
				return {attribute: at.name, value: at.value}
			}),
		parents: getParents(element.parentElement, []),
		children: getChildren(element),
		siblings: getSiblings(element),
		domRect: element.getBoundingClientRect(),
		text: element.innerText,
	}
}