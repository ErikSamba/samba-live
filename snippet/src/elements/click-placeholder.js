import {createElement} from './../utils/element'

const ClickPlaceholder = createElement({
	tagName: 'div',
	styles: {
		backgroundColor: '#0000ff1c',
		border: '1px solid rgba(0, 0, 255, .6)',
		position: 'absolute',
		display: 'none',
	},
	appendToDocument: true,
})

/**
 * isClickPlaceholder
 * @param {any} element
 */
export function isClickPlaceholder(element) {
	return ClickPlaceholder.id === element.id
}

/**
 * setPosition
 * @param {{
 * 	top: number,
 * 	left: number,
 * 	height: number,
 * 	width: number,
 * }} domRect
 */
export function setPosition(domRect) {
	ClickPlaceholder.setStyle({
		width: (domRect.width + 4) + 'px',
		height: (domRect.height + 4) + 'px',
		top: (domRect.top + window.scrollY - 2) + 'px',
		left: (domRect.left + window.scrollX - 2) + 'px',
	})
}

export function showClickPlaceholder() {
	ClickPlaceholder.show()
}

export function hideClickPlaceholder() {
	ClickPlaceholder.hide()
}