import {createElement} from './../utils/element'

const BORDER_STYLE = '1px solid rgb(100, 132, 187)'

const h1 = createElement({
	tagName: 'div',
	styles: {
		border: BORDER_STYLE,
		height: 0,
		width: '100%',
		position: 'absolute',
		left: 0,
	},
	appendToDocument: true,
})
const h2 = createElement({
	tagName: 'div',
	styles: {
		border: BORDER_STYLE,
		height: 0,
		width: '100%',
		position: 'absolute',
		left: 0,
	},
	appendToDocument: true,
})
const v1 = createElement({
	tagName: 'div',
	styles: {
		border: BORDER_STYLE,
		height: '100%',
		width: 0,
		position: 'absolute',
		top: 0,
	},
	appendToDocument: true,
})
const v2 = createElement({
	tagName: 'div',
	styles: {
		border: BORDER_STYLE,
		height: '100%',
		width: 0,
		position: 'absolute',
		top: 0,
	},
	appendToDocument: true,
})

export function setCoords(domRect) {
	const top = (domRect.top + window.scrollY - 2) + 'px'
	const bottom = (domRect.top + window.scrollY + domRect.height + 2) + 'px'
	const left = (domRect.left + window.scrollX - 2) + 'px'
	const right = (domRect.left + window.scrollX + domRect.width + 2) + 'px'
	const height = (domRect.height + 6) + 'px'
	const width = (domRect.width + 4) + 'px'

	h1.setStyle({top, width: width, left})
	h2.setStyle({top: bottom, width, left})
	v1.setStyle({left, height, top})
	v2.setStyle({left: right, height, top})
}

export function showCoords() {
	v1.show()
	v2.show()
	h1.show()
	h2.show()
}

export function hideCoords() {
	v1.hide()
	v2.hide()
	h1.hide()
	h2.hide()
}