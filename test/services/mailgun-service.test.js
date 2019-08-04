const expect = require('chai').expect;
const nock = require('nock');
const config = require('../../configs/config');
const mailgun = require('../../services/mailgun-service');

describe('test mailgun service', () => {

    const data = {
        from: 'mailgun@' + config.mailgun_domain,
        to: 'sreeharitest1@mailinator.com',
        subject: 'Mocha test',
        text: 'How are you Mocha?'        
    };

    const res = {
        "id": "1",
        "message": "Queued. Thank you."
    };

    beforeEach(() => {
        nock(config.mailgun_base_url)
          .post('/messages', function(body) {
            console.log('body is', JSON.stringify(body));
            console.log('data is', JSON.stringify(data));
            return JSON.stringify(body) === JSON.stringify(data);
          })
          .reply(200, res);
    });

    it('Should send mail from mailgun', () => {
        return mailgun.sendEmail({
            subject: 'Mocha test',
            content: 'How are you Mocha?'
        })
        .then(response => {
            //expect an object back
            //console.log('response is', response);
            expect(typeof response).to.equal('object');
            expect(response.id).to.equal(res.id);
            expect(response.message).to.equal(res.message);
           
        });
    });
});
