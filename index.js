const express = require('express');
const app = express();
const globalConfig = require('./config')
const loader = require('./loader')
const history = require('connect-history-api-fallback')

app.use(history());
app.use('/', express.static('./page/dist')),
app.use('/load', express.static('./page/load')),
loader.init(app);
app.listen(globalConfig.port)