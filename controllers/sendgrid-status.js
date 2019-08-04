const rp = require('request-promise');
const config = require('../configs/config');


var checkStatus = async function(){

    try{
        const data = {
            "personalizations": [{
                "to": [{
                    "email": "john@example.com"
                }],
                "subject": "Ping sendgrid"
            }],
            "from": {
                "email": "sreeharitest1@mailinator.com"
            },
            "content": [{
                "type": "text",
                "value": "How are you sendgrid?"
            }],
            "mail_settings": {
                "sandbox_mode": {
                    "enable": true
                }
            }
        }        
    
        const options = {
            method: 'POST',
            headers: { 'Authorization' : "Bearer "+ config.sendgrid_apikey,
                        'Content-Type': 'application/json' },
            body : data,
            url: config.sendgrid_base_url + '/send',            
            json : true
        };
    
        return await rp(options);                
    }catch(err){
        console.log(err);
        return err;
    }
}

module.exports = {checkStatus};