import constants from 'common-constants'

import {
	isClickPlaceholder,
	hideClickPlaceholder,
	setPosition,
	showClickPlaceholder,
} from './../elements/click-placeholder'
import {
	getAttributes,
} from './../utils/attributes'
import createElementWidgetFrame from './../frames/element-widget'

export default function createOnclickEvent(iframeSrc) {
	const ElementWidget = createElementWidgetFrame(iframeSrc)
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
	function setPositions(domRect) {
		setPosition(domRect)
		ElementWidget.setPosition(domRect)
	}

	function editMode(attributes) {
		showClickPlaceholder()
		ElementWidget.show()
		// hideCoords()
		setPositions(attributes.domRect)
	}

	function selectMode() {
		hideClickPlaceholder()
		// showCoords()
		ElementWidget.hide()
	}

	/**
	 * @param {MouseEvent} ev
	 */
	return function onClick(ev) {
		const element = ev.target
		if (isClickPlaceholder(element)) {
			selectMode()
			return
		}
		ev.stopPropagation()
		ev.preventDefault()
		try {
			const attributes = getAttributes(element)
			editMode(attributes)
			// @ts-ignore
			ElementWidget.send(constants.events.ELEMENT_SELECTED, attributes)
		} catch (error) {
			console.log(error)
			selectMode()
		}
	}
}