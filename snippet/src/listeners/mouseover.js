import {setCoords} from './../elements/coords'

/**
 * mouseover
 * @param {any} ev
 */
export function onMouseover(ev) {
	try {
		const element = ev.target
		const domRect = element.getBoundingClientRect()
		setCoords(domRect)
	} catch (error) {
		console.log(error)
	}
}