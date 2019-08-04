var mailgun = require('./mailgun-status');
var sendgrid = require('./sendgrid-status');
 
var activeMailServer = '';

var setActiveMailServer = function(){
    retrieveActiveMailServer()
    .then(res => {
        console.log(res);        
        activeMailServer = res
    })
    .catch(err => console.log('Error is getting active mail server', err));
}

var getActiveMailServer = function(){
    return activeMailServer;
}

async function retrieveActiveMailServer(){

    try{
        var mailgunStatus = await mailgun.checkStatus();
        if(mailgunStatus.statusCode == '200'){        
            return 'mailgun';
        }

        var sendgridStatus = await sendgrid.checkStatus()    
        if(sendgridStatus.statusCode == '200' || sendgridStatus.statusCode == '202'){
            return 'sendgrid';        
        }

        return;
    }catch(err){
        return err;
    }
}

module.exports = {getActiveMailServer,
                    setActiveMailServer};