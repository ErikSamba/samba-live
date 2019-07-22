require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()
const port = process.env.SAMBA_LIVE_PORT

app.get('/', (req, res) => res.send('SAMBA LIVE!'))

app.use('/web-samples', express.static(path.join(process.cwd(), 'web-samples')))
app.use('/snippet', express.static(path.join(process.cwd(), 'snippet/output')))
app.use('/element-widget', express.static(path.join(process.cwd(), 'client/dist')))

app.listen(port, () => console.log(`SAMBA LIVE is listening on port: ${port}!`))