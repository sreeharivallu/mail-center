var express = require('express')
var router = express.Router();
const email = require('./').email;

// define the home page route
router.get('/', function (req, res) {
  res.send('email home page')
})

// define the about route
router.post('/', email.sendEmail);

module.exports = router