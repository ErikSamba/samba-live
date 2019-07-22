import Host from 'ifrau/host'

import {generateId, styleElement} from './../utils/element'

/**
 * createFrame
 * @param {string} src
 * @param {number} width
 * @param {number} height
 * @param {Array<{messageType: string, callback: Function}>=} events
 */
export function createFrame(src, width, height, events) {
	function parentProvider() {
		return document.body
	}
	const id = generateId()
	const host = new Host(parentProvider, src, {
		id,
		resizeFrame: false,
	})
	if (events && events.length) {
		events.forEach((event) => {
			// @ts-ignore
			host.onRequest(event.messageType, event.callback)
		})
	}
	host.connect().then(function() {
		console.debug('connected to client')
	})
	// const iframe = createElement({tagName: 'iframe', styles: {position: 'absolute'}})
	const iframeElement = document.getElementById(id)

	iframeElement.setAttribute('frameborder', '0')
	iframeElement.setAttribute('width', width.toString())
	iframeElement.setAttribute('height', height.toString())
	iframeElement.setAttribute('src', src)

	// document.body.appendChild(iframeElement)

	/**
	 * setStyle
	 * @param {Record<string, any>} styles
	 */
	function setStyle(styles) {
		styleElement(iframeElement, styles)
	}

	function show() {
		styleElement(iframeElement, {display: 'block'})
	}

	function hide() {
		styleElement(iframeElement, {display: 'none'})
	}

	function send(event, payload) {
		// @ts-ignore
		host.sendEvent(event, payload)
	}

	setStyle({
		position: 'absolute',
		display: 'none',
		width: `${width}px`,
		height: `${height}px`,
	})

	return {
		getElement: () => iframeElement,
		setStyle,
		show,
		hide,
		id,
		send,
	}
}