'use strict';

var Config = {    
    port: process.env.PORT || '3000',
    from: 'sreeharinoreply@mailinator.com',
    mailgun_apikey: process.env.mailgun_apikey,    
    mailgun_domain : process.env.mailgun_domain,
    mailgun_base_url: 'https://api.mailgun.net/v3/' + process.env.mailgun_domain,
    sendgrid_apikey: process.env.sendgrid_apikey,
    sendgrid_base_url: 'https://api.sendgrid.com/v3/mail'
}

module.exports = Config;