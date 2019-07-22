import React, { useCallback, useState } from 'react'
import { Label, List, Icon, Accordion } from 'semantic-ui-react'
import Scrollbars from 'react-custom-scrollbars'
import classnames from 'classnames'

import { AttributesT } from 'element-widget/app/selector/selector-duck'
import TruncateText from 'element-widget/components/truncate-text/truncate-text'

import style from './parents.module.scss'

const scrollbarsStyles = { height: 400 - 54, width: '100%' }

type Props = {
	selectedElement: AttributesT,
	hover: (selector: string) => void,
	click: (selector: string) => void,
}

const ParentItem: React.FC<{
	selector: { tagName: string, path: string },
	hover: (selector: string) => void,
	click: (selector: string) => void,
}> = ({ selector, hover, click }) => {
	const onHover = useCallback(() => {
		hover(selector.path)
	}, [hover, selector])

	const onClick = useCallback(() => {
		click(selector.path)
	}, [click, selector])

	return (
		<List.Item onClick={onClick} onMouseOver={onHover} className={style.listItem} key={selector}>
			<Label color='yellow' horizontal>
				{selector.tagName.toUpperCase()}
			</Label>
			<span className={style.selector}>
				<TruncateText text={selector.path} length={35} />
			</span>
		</List.Item>
	)
}

const Parents: React.FC<Props> = ({ selectedElement, hover, click }) => {
	if (!selectedElement) return null

	const renderParentItem = useCallback((selector) => {
		return <ParentItem key={selector.path} selector={selector} hover={hover} click={click} />
	}, [hover, click])

	const [activeIndex, setActiveIndex] = useState(1)

	return (<Scrollbars
		renderThumbVertical={props => <div {...props} className={classnames('thumb-horizontal', style.thumb)} />}
		style={scrollbarsStyles}>
		<div className={style.container}>
			<Accordion inverted fluid>
				<Accordion.Title active={activeIndex === 1} index={1} onClick={() => activeIndex !== 1 ? setActiveIndex(1) : setActiveIndex(0)}>
					<Icon name='dropdown' />
					Parents
        		</Accordion.Title>
				<Accordion.Content active={activeIndex === 1}>
					<List divided selection>
						{[...selectedElement.parents].reverse().map(renderParentItem)}
					</List>
				</Accordion.Content>
				<Accordion.Title active={activeIndex === 2} index={2} onClick={() => activeIndex !== 2 ? setActiveIndex(2) : setActiveIndex(0)}>
					<Icon name='dropdown' />
					Siblings
        		</Accordion.Title>
				<Accordion.Content active={activeIndex === 2}>
					<List divided selection>
						{selectedElement.siblings.map(renderParentItem)}
					</List>
				</Accordion.Content>
				<Accordion.Title active={activeIndex === 3} index={3} onClick={() => activeIndex !== 3 ? setActiveIndex(3) : setActiveIndex(0)}>
					<Icon name='dropdown' />
					Children
        		</Accordion.Title>
				<Accordion.Content active={activeIndex === 3}>
					<List divided selection>
						{selectedElement.children.map(renderParentItem)}
					</List>
				</Accordion.Content>
			</Accordion>
		</div>
	</Scrollbars>
	)
}

export default Parents