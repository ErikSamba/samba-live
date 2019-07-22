import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Client from 'ifrau/client'
import 'semantic-ui-css/semantic.min.css'

import constants from 'common-constants'
import { setupAppWithRedux } from 'setup/setup-redux'

import App from './app/app'
import rootSaga from './app/root-saga'
import rootReducer from './app/root-reducer'
import {selectElement} from './app/selector/selector-duck'


const messengerClient = new Client({
	syncLang: false,
})
messengerClient
    .connect()
    .then(function() {
		console.debug('Connected to host!')
		const store = setupAppWithRedux(rootSaga, rootReducer, {messengerClient})
		messengerClient.onEvent(constants.events.ELEMENT_SELECTED, function(payload: any) {
			store.dispatch(selectElement(payload))
		})
		ReactDOM.render(
			<Provider store={store}>
				<App />
			</Provider>,
			document.getElementById('root'),
		)
    })

