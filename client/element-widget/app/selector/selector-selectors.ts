import {Selector} from 'reselect'

import {RootStateT} from 'element-widget/app/root-reducer'

const getSelectorState: Selector<RootStateT, RootStateT['selector']> = (state) => state.selector

export const getSelectedElement: Selector<RootStateT, RootStateT['selector']['selectedElement']> =
	(state) => getSelectorState(state).selectedElement
