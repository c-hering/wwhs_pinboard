# WWHS Pinboard
This is a small 'pinboard' where people can use SMS to send a 'pin' or message to a number and their message will be displayed in order of occurance on the website!

This is a REST server running on Node.js and Express

### Current Status
GET from / -> get home page, currently only displays a simple message</br>
POST to /messages -> post message from SMS, should work for Twilio numbers (if correctly set up), only prints message to console, does not add to sqlite db
  
### TODO:
GET from / -> get home page, display all messages stored on a sqlite db</br>
POST to /messages -> add message from SMS to sqlite db
  
