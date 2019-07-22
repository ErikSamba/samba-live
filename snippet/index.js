import {listen} from './src/listeners/index'

function inject () {
	console.log('SAMBA LIVE! INJECTED :)')
	// @ts-ignore
	listen(ELEMENT_WIDGET_URL)
}

(function () {
	inject()
})()