var express = require('express');
var bodyParser = require('body-parser');
var cron = require('node-cron');
var routes = require('./routes/routes');
var mailServer = require('./controllers/mail-server-status');
//const dotenv = require('dotenv');
//dotenv.config();
var mailServerStatus = require('./controllers/mail-server-status');
const config = require('./configs/config');
console.log(config);

const port = process.env.PORT || 3000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

/*app.use(function (err, req, res, next) {
    if (err.code === 'permission_denied') {
      res.status(403).send('Forbidden');
    }
});
*/
app.get('/', (req, res) => {  
    res.send('Hello email manager for siteminder!')
})

app.use('/email', routes);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
    cron.schedule('15 * * * * *', mailServer.setActiveMailServer);
})
