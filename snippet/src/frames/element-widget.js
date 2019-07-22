import constants from 'common-constants'

import {createFrame} from './frame'
import {ELEMENT_WIDGET_HEIGHT, ELEMENT_WIDGET_WIDTH} from './../consts'
import {setCoords} from './../elements/coords'
import {setPosition as setClickPlaceholderPosition} from './../elements/click-placeholder'
import {getAttributes} from './../utils/attributes'

/**
 * createElementWidgetFrame
 * @param {string} iframeSrc
 */
const createElementWidgetFrame = (iframeSrc) => {
	/**
	 * relatedHovered
	 * @param {string} selector
	 */
	function relatedHovered(selector) {
		const element = document.querySelector(selector)
		const domRect = element.getBoundingClientRect()
		setCoords(domRect)
		return true
	}

	/**
	 * relatedClicked
	 * @param {string} selector
	 */
	function relatedClicked(selector) {
		const element = document.querySelector(selector)
		const attributes = getAttributes(element)
		setPosition(attributes.domRect)
		setClickPlaceholderPosition(attributes.domRect)
		return attributes
	}

	/**
	 * changeInnerText
	 * @param {string} selector
	 * @param {string} innerText
	 */
	function changeInnerText(selector, innerText) {
		/** @type {HTMLElement} */
		const element = document.querySelector(selector)
		if (element) {
			element.innerText = innerText
		}
	}

	/**
	 * changeAttribute
	 * @param {string} selector
	 * @param {string} attribute
	 * @param {string} value
	 */
	function changeAttribute(selector, attribute, value) {
		/** @type {HTMLElement} */
		const element = document.querySelector(selector)
		if (element) {
			element.setAttribute(attribute, value)
		}
	}

	const events = [{
		messageType: constants.events.RELATED_HOVERED,
		callback: relatedHovered,
	}, {
		messageType: constants.events.RELATED_CLICKED,
		callback: relatedClicked,
	}, {
		messageType: constants.events.CHANGE_INNER_TEXT,
		callback: changeInnerText,
	}, {
		messageType: constants.events.CHANGE_ATTRIBUTE,
		callback: changeAttribute,
	}]

	const ElementWidgetFrame = createFrame(iframeSrc, ELEMENT_WIDGET_WIDTH, ELEMENT_WIDGET_HEIGHT, events)

	ElementWidgetFrame.setStyle({
		borderRadius: '2px',
	})
	/**
 * setPosition
 * @param {{
 * 	left: number,
 * 	top: number,
 * 	right: number,
 * 	bottom: number,
 * 	height: number,
 * 	width: number,
 * }} domRect
 */
	function setPosition({top, left, right, height}) {
		if (window.scrollY + top + height + ELEMENT_WIDGET_HEIGHT <= document.body.scrollHeight) {
			// render iframe bottom
			ElementWidgetFrame.setStyle({
				top: `${window.scrollY + top + height + 5}px`,
				bottom: 'auto',
			})
			if (window.scrollX + left + ELEMENT_WIDGET_WIDTH <= document.body.scrollWidth) {
				// render iframe bottom left
				ElementWidgetFrame.setStyle({
					left: `${window.scrollX + left - 2}px`,
					right: 'auto',
				})
			} else {
				// render iframe bottom right
				ElementWidgetFrame.setStyle({
					left: `auto`,
					right: `${document.body.scrollWidth - right - 2}px`,
				})
			}
		} else {
			// render iframe top
			ElementWidgetFrame.setStyle({
				top: `auto`,
				bottom: `${window.scrollY + top - 5}px`,
			})
			if (window.scrollX + left + ELEMENT_WIDGET_WIDTH <= document.body.scrollWidth) {
				// render iframe bottom left
				ElementWidgetFrame.setStyle({
					left: `${window.scrollX + left - 2}px`,
					right: 'auto',
				})
			} else {
				// render iframe bottom right
				ElementWidgetFrame.setStyle({
					left: `auto`,
					right: `${document.body.scrollWidth - right - 2}px`,
				})
			}
		}
	}
	return {
		...ElementWidgetFrame,
		setPosition,
	}
}

export default createElementWidgetFrame