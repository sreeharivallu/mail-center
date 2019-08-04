# Siteminder Email invitation code challenge

# How to Run

1. export mailgun_apikey=XXXXXXXX
2. export mailgun_domain=XXXXXXXX
3. export sendgrid_apikey=XXXXXXXX
4. npm run start (or) node app.js


# test
1. export mailgun_apikey=XXXXXXXX
2. export mailgun_domain=XXXXXXXX
3. export sendgrid_apikey=XXXXXXXX
4. npm run test (or) mocha test/**/*.test.js


# APIs 

1. Method: POST
   Endpoint: /email

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
2. sreeharitest1@mailinator.com
3. sreeharitest1@mailinator.com
4. sreeharitest1@mailinator.com
