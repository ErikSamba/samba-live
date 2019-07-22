import React from 'react'
import { Grid } from 'semantic-ui-react'

import Editor from 'element-widget/sections/editor/editor-connected'
import Parents from 'element-widget/sections/parents/parents-connected'

import './app.global.scss'

const App: React.FC = () => {
	return (<div>
		<div className='header'>
			<img src='https://uploads-ssl.webflow.com/5c90ba896f6f8838799d28b3/5ccffab815eeac849af4ba44_logo-Samba.png' />
		</div>
		<Grid columns={2}>
			<Grid.Column>
				<Editor />
			</Grid.Column>
			<Grid.Column>
				<Parents />
			</Grid.Column>
		</Grid>
	</div>)
}

export default App