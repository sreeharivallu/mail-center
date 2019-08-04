const isemail = require('isemail');
const mailServer = require("../controllers/mail-server-status");
const mailgun = require("../services/mailgun-service");
const sendgrid = require("../services/sendgrid-service");

var sendEmail = function(req, res, next){

    if(!req.body){
        res.status(400).send({reason : 'No data in the request'})
    }

    //Validate request body
    let result = validateRequest(req.body);

    if(!result.valid){
        // Invalid request
        return res.status(400).send({reason: result.reason})
    }

    //For a valid request, get email server
    let emailServer = mailServer.getActiveMailServer();

    //Send Email
    if(emailServer == 'mailgun'){
        mailgun.sendEmail(req.body)
        .then(mail => {
            res.status(200).send({success: true});
        })
        .catch(err => {
            console.log(err);            
            if(err.statusCode == 400){
                res.status(400).send({reason: 'This is a sandbox account. Can only send to some emails'});
            }else{
                res.status(500).send({reason: 'Unknown error'});
            }
            
        })        
    }else if(emailServer == 'sendgrid'){
        sendgrid.sendEmail(req.body)
        .then(mail => {
            res.status(200).send({success: true});
        })
        .catch(err => {
            console.log(err);
            if(err.statusCode == 400){
                res.status(400).send({reason: 'This is a sandbox account. Can only send to some emails'});
            }else{
                res.status(500).send({reason: 'Unknown error'});
            }
        })
    }else{
        res.status(500).send({reason : "Currently all our mail servers are under maintenance"});
    }
}

function validateRequest(body){
    
    let {to, cc, bcc, subject, content} = body;
   
    if(isParametersMissing(body)){
        return {valid : false, reason: 'missing mandatory parameters'};
    }
    
    if(!validateEmails(to)){
        return {valid : false, reason : 'invalid to email list'};
    }

    if(cc && !validateEmails(cc)){
        return {valid : false, reason : 'invalid cc email list'};
    }

    if(bcc && !validateEmails(bcc)){
        return {valid : false, reason : 'invalid bcc email list'}
    }

    return {valid : true};
}

function isParametersMissing(body){
    let {to, subject, content} = body;

    if(to &&  
    subject &&       
    content){
        return false;
    }else {
        return true;
    }
}

function validateEmails(emails){

    let emailList = emails.split(',').map(email => email.trim());    
    for(let i=0;i<emailList.length;i++){        
        if(!isemail.validate(emailList[i])){
            return false;
        }        
    }
    return true;
}

module.exports = {
    sendEmail
}