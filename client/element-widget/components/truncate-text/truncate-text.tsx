import React from 'react'
import {Popup} from 'semantic-ui-react'

import {truncateSelector} from 'element-widget/utils/text'

type Props = {
	text: string,
	length?: number,
}

const TruncateText: React.FC<Props> = ({text, length}) => {
	return (<Popup content={text} trigger={<span>{truncateSelector(text, length)}</span>} />)
}

export default TruncateText