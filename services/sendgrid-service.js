const rp = require('request-promise');
const config = require('../configs/config');

var sendEmail = async function(emailDetails){
    console.log('send email of sendgrid');
    try{        
        const data = { "personalizations": [{
            "to"     : prepareMailingList(emailDetails.to),
            "cc"     : prepareMailingList(emailDetails.cc),
            "bcc"     : prepareMailingList(emailDetails.bcc) }],
            "from": {email : config.from},
            "subject": emailDetails.subject,
            "content": [{"type": "text/plain","value": emailDetails.content}]
        };
        
        const options = {
            method: 'POST',
            headers: { 'Authorization' : "Bearer "+ config.sendgrid_apikey },                        
            body : data,
            url: config.sendgrid_base_url + '/send',
            resolveWithFullResponse: true,
            json : true
        };
    
        console.log('options are', options);    
        return rp(options);
    }
    catch(err){
        console.log('err is', err);
        return err
    }

}

function prepareMailingList(mails){
    if(mails){
        return mails.split(',').map(mail => { return {email : mail} })
    }

    return;
}

module.exports = {sendEmail};