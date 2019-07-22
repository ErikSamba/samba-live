import createOnclickEvent from './click'
import {onMouseover} from './mouseover'

/**
 * listen
 * @param {string} ElementWidgetSrc
 */
export function listen(ElementWidgetSrc) {
	document.addEventListener('click', createOnclickEvent(ElementWidgetSrc), true)
	document.addEventListener('mouseover', onMouseover)
}