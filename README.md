# Siteminder Email invitation code challenge
Task: To create a service that accepts necessary information and send emails using email providers like mailgun and sendgrid.

# How to Run

1. npm install
2. export mailgun_apikey=XXXXXXXX
3. export mailgun_domain=XXXXXXXX
4. export sendgrid_apikey=XXXXXXXX
5. npm run start (or) node app.js

npm run start fails, if the mentioned environment variables are not set

# test
1. export mailgun_apikey=123
2. export mailgun_domain=123@sreehari.com
3. export sendgrid_apikey=123
4. npm run test (or) mocha test/**/*.test.js

# APIs 
. Method: POST

. Endpoint: /email

# Input

{
 "to" : "sreeharitest1@mailinator.com, sreeharitest2@mailinator.com",
 "cc" : "sreeharitest3@mailinator.com",
 "bcc" : sreeharitest4@mailinator.com,
 "content" : "Hello, How are you?"
 "subject" : "Test"
}

# Success Response:
Status 200
{   
    "success": true
}

# Possible failure Responses
Status 400
1. {
      "Reason" : "Missing Mandatory parameters"
   }

2. {
      "Reason" : "invalid to email list"
  }
  
3. {
      "Reason" : "invalid cc email list"
  }
  
4. {
      "Reason" : "invalid bcc email list"
  }
  
5. {
      "Reason": "This is a sandbox account. Can only send to some emails"
    }
  
Status 500  
1.  If both mail servers are down then  
  { 
    "Reason" : "Currently all our mail servers are under maintenance"
  }
  
2. {
      "Reason" : "Unknown error"
  }
  

# Heroku deployment
https://my-mail-center.herokuapp.com/email

Heroku deployment used sandbox mailgun and sendgrid accounts. Hence, mail can only be send to specific emails. Below are the listed.

1. sreeharitest1@mailinator.com
2. sreeharitest2@mailinator.com
3. sreeharitest3@mailinator.com
4. sreeharitest4@mailinator.com

# TODOs
1. Due to time constraint, test cases are written only for services. More test cases inlcuding negative test cases has to be written. Used Mocha, Chai and Sinon for the written test cases.

2. Just written config for one environment. Improvements has to be done deploy based on environment like Dev, Test and Prod.

3. If both mailgun and sendgrid are not responding, then we are sending error response. Improvement can be done to queue the messages in Kafka or AWS SQS and send to mail service once they are available.

4. From is hardcoded in config as I tested only on sandbox mode.
