import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {getSelectedElement} from 'element-widget/app/selector/selector-selectors'
import {hoverRelated, clickRelated} from 'element-widget/app/selector/selector-duck'

import Parents from './parents'

const mapStateToProps = createStructuredSelector({
	selectedElement: getSelectedElement,
})

const dispatchToProps = {
	hover: hoverRelated,
	click: clickRelated,
}

export default connect(mapStateToProps, dispatchToProps)(Parents)