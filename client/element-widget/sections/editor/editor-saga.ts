import {Saga} from 'redux-saga'
import {takeLatest, delay, getContext, select} from 'redux-saga/effects'

import constants from 'common-constants'
import {getSelectedElement} from 'element-widget/app/selector/selector-selectors'

import {changeInnerText, changeAttribute} from './editor-duck'

const handleInnerTextChanged: Saga<[{payload: string}]> = function* ({payload}) {
	yield delay(500)
	const messengerClient = yield getContext('messengerClient')
	const selectedElement = yield select(getSelectedElement)
	messengerClient.request(constants.events.CHANGE_INNER_TEXT, selectedElement.selector, payload)
}

const handleChangeAttributes: Saga<[{payload: {attribute: string, value: string}}]> = function* ({payload}) {
	yield delay(500)
	const messengerClient = yield getContext('messengerClient')
	const selectedElement = yield select(getSelectedElement)
	messengerClient.request(constants.events.CHANGE_ATTRIBUTE, selectedElement.selector, payload.attribute, payload.value)
}

export default function* EditorSaga() {
	yield takeLatest(changeInnerText, handleInnerTextChanged)
	yield takeLatest(changeAttribute, handleChangeAttributes)
}