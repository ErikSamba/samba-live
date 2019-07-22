import {createAction, handleActions} from 'redux-actions'

export type SelectorStateT = {
	selectedElement?: AttributesT,
}

export type AttributesT = {
	attributes: Array<{attribute: string, value: string}>,
	domRect: {width: number, height: number, top: number, bottom: number, left: number, right: number},
	parents: Array<{tagName: string, path: string}>,
	siblings: Array<{tagName: string, path: string}>,
	children: Array<{tagName: string, path: string}>,
	tagType: string,
	selector: string,
	text: string,
}

export const selectElement = createAction<AttributesT>('selector/selectElement')

export const hoverRelated = createAction<string>('selector/hoverRelated')

export const clickRelated = createAction<string>('selector/clickRelated')

const reducer = handleActions<SelectorStateT, any>({
	[String(selectElement)]: (state, action) => ({...state, selectedElement: action.payload}),
}, {})

export default reducer