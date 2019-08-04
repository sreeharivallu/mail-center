const rp = require('request-promise');
const config = require('../configs/config');

var checkStatus= async function(){

    try{
        const data = {
            from: 'mailgun@' + config.mailgun_domain,
            to: 'sreeharitest1@mailinator.com',
            subject: 'ping mailgun',
            text: 'How are you mailgun?',
            'o:testmode': 'True'
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
        console.log(options);
        return await rp(options);                        
    }catch(err){
        console.log(err );
        return err;
    }
}

module.exports = {checkStatus};