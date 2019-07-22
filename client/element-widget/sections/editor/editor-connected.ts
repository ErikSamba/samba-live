import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {getSelectedElement} from 'element-widget/app/selector/selector-selectors'

import {changeInnerText, changeAttribute} from './editor-duck'
import Editor from './editor'

const mapStateToProps = createStructuredSelector({
	selectedElement: getSelectedElement,
})

const dispatchToProps = {
	changeInnerText,
	changeAttribute,
}

export default connect(mapStateToProps, dispatchToProps)(Editor)