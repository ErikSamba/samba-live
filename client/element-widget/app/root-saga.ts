import {all, fork, setContext} from 'redux-saga/effects'
import editorSaga from 'element-widget/sections/editor/editor-saga'

import selectorSaga from './selector/selector-saga'

const rootSaga = function * (extra: {messengerClient: Object}) {
	yield setContext(extra)
	yield all([
		fork(selectorSaga),
		fork(editorSaga),
	])
}

export default rootSaga