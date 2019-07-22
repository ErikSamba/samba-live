import {Saga} from 'redux-saga'
import {takeLatest, delay, getContext, put} from 'redux-saga/effects'

import constants from 'common-constants'

import {hoverRelated, clickRelated, selectElement} from './selector-duck'

const handleRelatedHovered: Saga<[{payload: string}]> = function* ({payload}) {
	yield delay(500)
	const messengerClient = yield getContext('messengerClient')
	messengerClient.request(constants.events.RELATED_HOVERED, payload)
}

const handleRelatedClicked: Saga<[{payload: string}]> = function* ({payload}) {
	const messengerClient = yield getContext('messengerClient')
	const attributes = yield messengerClient.request(constants.events.RELATED_CLICKED, payload)
	yield put(selectElement(attributes))
}

export default function* SelectorSaga() {
	yield takeLatest(hoverRelated, handleRelatedHovered)
	yield takeLatest(clickRelated, handleRelatedClicked)
}

