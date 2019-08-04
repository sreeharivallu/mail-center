'use strict';

var Config = {    
    port: process.env.PORT || '3000',
    mailgun_apikey: process.env.mailgun_apikey,    
    mailgun_domain : process.env.mailgun_domain,
    mailgun_base_url: 'https://api.mailgun.net/v3/' + process.env.mailgun_domain,
    sendgrid_apikey: process.env.sendgrid_apikey,
    sendgrid_base_url: 'https://api.sendgrid.com/v3/mail'
}

/*var testConfig = {    
    port: '3000',
    mailgun_apikey: 'b61506c86eb5b65266ff309cea53d217-f877bd7a-21f4cb9e',
    mailgun_base_url: 'https://api.mailgun.net/v3/sandbox47fe715531c543f98035474411ad0a53.mailgun.org',
    sendgrid_apikey: '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',
    sendgrid_base_url: 'https://api.sendgrid.com/v3/mail'
}*/

module.exports = Config;