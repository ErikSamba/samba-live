import React, {useCallback} from 'react'
import { Label, Form } from 'semantic-ui-react'
import Scrollbars from 'react-custom-scrollbars'
import classnames from 'classnames'

import { AttributesT } from 'element-widget/app/selector/selector-duck'
import { renderAttributeName } from 'element-widget/utils/text'
import TruncateText from 'element-widget/components/truncate-text/truncate-text'

import style from './editor.module.scss'

type Props = {
	selectedElement: AttributesT,
	changeInnerText: (text: string) => void,
	changeAttribute: (payload: {attribute: string, value: string}) => void,
}

const scrollbarsStyles = { height: 400 - 54, width: '100%' }

const Editor: React.FC<Props> = ({ selectedElement, changeInnerText, changeAttribute }) => {
	if (!selectedElement) return null
	const changeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		changeInnerText(e.target.value)
	}, [changeInnerText])

	return (<Scrollbars
		renderThumbVertical={props => <div {...props} className={classnames('thumb-horizontal', style.thumb)} />}
		style={scrollbarsStyles}>
		<div className={style.container}>
			<Label color='yellow'>
				{selectedElement.tagType.toUpperCase()}
				<Label.Detail>
					<TruncateText text={selectedElement.selector} />
				</Label.Detail>
			</Label>
			<br />
			<Form inverted>
				{selectedElement.attributes.map((attribute) => {
					return (<Form.Field key={attribute.attribute}>
						<label>{renderAttributeName(attribute.attribute)}</label>
						<input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							changeAttribute({attribute: attribute.attribute, value: e.target.value})
						}} defaultValue={attribute.value} />
					</Form.Field>)
				})}
				{
					selectedElement.text && <Form.Field>
						<label>Text</label>
						<textarea rows={3} onChange={changeText} defaultValue={selectedElement.text}></textarea>
					</Form.Field>
				}
			</Form>
			<br />
		</div>
	</Scrollbars>)
}

export default Editor