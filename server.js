require('dotenv').load()
const
  PORT = 8080,
  DATABASE = 'react-ys4s',
  bodyParser = require('body-parser'),
  express = require('express'),
  app = express()

app.get('/', (req, res) => res.sendFile(__dirname + '/build/index.html'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true, limit: '25mb'}));
app.use(express.static(__dirname + '/build'))

require('./server/config/mongoose')(DATABASE)
require('./server/config/routes')(app)

// app.get('/*', (req, res) =>  res.redirect('/'))

app.listen(PORT, () => console.log(`(server): listening on port ${PORT}...`))
