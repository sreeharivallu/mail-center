var mailgun = require('./mailgun-status');
var sendgrid = require('./sendgrid-status');
 
var activeMailServer = '';

var setActiveMailServer = function(){
    retrieveActiveMailServer()
    .then(res => {
        console.log(res);        
        activeMailServer = res
    })
    .catch(err => console.log('Error in getting active mail server', err));
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

        if()
        
        var sendgridStatus = await sendgrid.checkStatus()    
        if(sendgridStatus.statusCode == '200' || sendgridStatus.statusCode == '202'){
            return 'sendgrid';        
        }

        if(mailgunStatus.statusCode == '401' || sendgridStatus.statusCode == '401'){
            console.log('Invalid credentials details are provided');
            process.exit();
        }

        return;
    }catch(err){        
        return err;
    }
}

module.exports = {getActiveMailServer,
                    setActiveMailServer};