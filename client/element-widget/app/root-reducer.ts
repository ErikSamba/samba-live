import {combineReducers} from 'redux'

import selector, {SelectorStateT} from './selector/selector-duck'

export type RootStateT = {
	selector: SelectorStateT,
}

export default combineReducers({
	selector,
})