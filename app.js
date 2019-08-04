var express = require('express');
var bodyParser = require('body-parser');
var cron = require('node-cron');
var routes = require('./routes/routes');
var mailServer = require('./controllers/mail-server-status');
const dotenv = require('dotenv').config();

var mailServerStatus = require('./controllers/mail-server-status');
const config = require('./configs/config');

const port = process.env.PORT || 3000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {  
    res.send('Hello email manager for siteminder!')
})

app.use('/email', routes);


// Ensure required ENV vars are set
let requiredEnv = [
    'mailgun_apikey', 'mailgun_domain', 'sendgrid_apikey'    
];

let unsetEnv = requiredEnv.filter((env) => !(typeof process.env[env] !== 'undefined'));
  
if (unsetEnv.length > 0) {
    throw new Error("Required ENV variables are not set: [" + unsetEnv.join(', ') + "]");
}else{
    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
        cron.schedule('15 * * * * *', mailServer.setActiveMailServer).start();
    })
}

