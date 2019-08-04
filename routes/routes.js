var express = require('express')
var router = express.Router();
const email = require('./').email;

// define the home page route
router.get('/', function (req, res) {
  res.send('This is email home page. use post method to send mails.')
})

// define the about route
router.post('/', email.sendEmail);

module.exports = router