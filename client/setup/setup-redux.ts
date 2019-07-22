import {applyMiddleware, createStore, Reducer, AnyAction} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

const getReduxMiddleware = function (rootSaga: any, optMiddlware?: Array<any>, contexts?: Object) {
	const sagaMiddleware = createSagaMiddleware()

	const mw = [
		...(optMiddlware || []),
		sagaMiddleware,
	]

	return {
		appliedMw: applyMiddleware(...mw),
		mwInit: () => sagaMiddleware.run(rootSaga, contexts)
	}
}

const createReduxStore = function (rootReducer: any, mw: any, mwInit: Function, preloadedState?: Object) {
	const store = createStore(
		rootReducer,
		preloadedState,
		composeWithDevTools(mw),
	)

	mwInit()

	return store
}

export const setupAppWithRedux = function(
	rootSaga: any,
	rootReducer: Reducer<any, AnyAction>,
	contexts?: Object,
	optMiddlware?: Array<any>,
	preloadedState?: Object,
) {
	const {appliedMw, mwInit} = getReduxMiddleware(rootSaga, optMiddlware, contexts)
	const store = createReduxStore(rootReducer, appliedMw, mwInit, preloadedState)
	return store
}