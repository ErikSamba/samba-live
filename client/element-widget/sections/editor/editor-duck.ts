import {createAction} from 'redux-actions'

export const changeInnerText = createAction<string>('editor/changeInnerText')

export const changeAttribute = createAction<{attribute: string, value: string}>('editor/changeAttribute')