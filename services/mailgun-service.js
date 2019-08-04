const rp = require('request-promise');
const config = require('../configs/config');

var sendEmail = async function(emailDetails){
    console.log('sendEmail of mailgun');
    try{
        const data = {
            from: 'mailgun@' + config.mailgun_domain,
            to: emailDetails.to,
            cc: emailDetails.cc,
            bcc: emailDetails.bcc,
            subject: emailDetails.subject,
            text: emailDetails.content        
        };
    
        var buffer = new Buffer(`api:${config.mailgun_apikey}`, 'binary');      
        const options = {
            method: 'POST',
            headers: { 'Authorization' : "Basic "+ buffer.toString('base64')},
            form: data,
            url: config.mailgun_base_url + '/messages',
            resolveWithFullResponse: true,
            json : true
        };    
        
        return rp(options)
    }    
    catch(err){
        console.log('err is', err);
        return err
    }
}

module.exports = {sendEmail};