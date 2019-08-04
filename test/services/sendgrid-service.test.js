const expect = require('chai').expect;
const nock = require('nock');
const config = require('../../configs/config');
const sendgrid = require('../../services/sendgrid-service');

describe('test sendgrid service', () => {

    const emailDetails = {"subject": 'Mocha test', 
        content : "How are you mocha?",
        to : 'sreeharitest1@mailinator.com, sreeharitest2@mailinator.com'};

    const data = { "personalizations": [{
        "to"     : emailDetails.to.split(',').map(to => { return {email : to} }) }],
        "from": {email : 'sree.bobby4u@gmail.com'},
        "subject": emailDetails.subject,
        "content": [{"type": "text/plain","value": emailDetails.content}]
    };
    
    const res = {
        status : 202
    };


    beforeEach(() => {
        nock(config.sendgrid_base_url)
          .post('/send', data)
          .reply(202, res);
    });

    it('Should send mail via sendgrid', () => {
        return sendgrid.sendEmail({
            subject: emailDetails.subject,
            content: emailDetails.content,
            to: emailDetails.to
        })
        .then(response => {
            //expect an object back            
            expect(typeof response).to.equal('object');
            expect(response.statusCode).to.equal(202);           
        });
    });
});