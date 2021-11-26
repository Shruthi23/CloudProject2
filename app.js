var express = require('express');
const expressLayouts=require('express-ejs-layouts');
var app = express();
var uuid = require('uuid');
var bodyParser=require("body-parser")
var path=require("path")
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const insertUtility=require("./utilities/doctor")
let users=require("./routes/users");
const { use } = require('./routes/users');
const decodeJwt=require("jwt-decode")
const formtopdf = require('./utilities/formtopdf')
const fs=require("fs")
var PDFDocument = require('pdfkit');
const { Console } = require('console');
let email=require("./routes/emailnotifier");

require("dotenv").config();
AWS.config.update({
  accessKeyId: process.env["ACCESS_KEY_ID"],
  secretAccessKey: process.env["SECRET_ACCESS_KEY"],
  region: process.env["AWS_REGION"] 
});

var scheduleHandler = require("./routes/medschedule");

app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(express.json())
app.use(expressLayouts);
//app.use(express.bof)
app.set('view engine','ejs')
//app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));
const poolData = {    
  UserPoolId : "us-west-1_x1klxacrm", // Your user pool id here    
  ClientId : "5nbvps4hlmh0a66mb4k771ns6f" // Your client id here
  }; 
  const pool_region = 'us-east-1';
  const pool=new AmazonCognitoIdentity.CognitoUserPool(poolData)

  
  // about page
app.use("/medSchedule",scheduleHandler);



//app.use("/",users);
  app.listen(3000);
  console.log('Server is listening on port 3000');





app.get('/addprescription',function(req,res){
  console.log(formtopdf)
  res.render("addprescription", {
    utils: formtopdf,
    email: req.query.email
  })
})

  app.get ("/schedule", function (req,res) {
    res.render ( "schedule.ejs" );	
    } )
 
function sendEmail(email,name){



  var params = {
    Destination: { /* required */
      CcAddresses: [
        'medexforu@gmail.com',
        /* more items */
      ],
      ToAddresses: [
       email,
        /* more items */
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
         Charset: "UTF-8",
         Data: '<div><center><img src="https://www.crushpixel.com/stock-photo/assorted-pharmaceutical-medicine-pills-tablets-1959484.html" alt="My Medication"  width="70" height="70"/></center><h3>Hello, '+name+'</h3><p>&nbsp;&nbsp;&nbsp;&nbsp;A new prescription has been added to you by your doctor.Login to the portal to view the details.</p><p>Regards,<br/><b>My Medication Team</b></p></div>'
        },
        Text: {
         Charset: "UTF-8",
         Data: `Dear ${name}, A new prescription has been added to you.Login to your application to view`
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: 'Prescription Added.'
       }
      },
    Source: 'medexforu@gmail.com', /* required */
    ReplyToAddresses: [
       'medexforu@gmail.com',
      /* more items */
    ],
  };
  // Create the promise and SES service object
 var sendPromise = new AWS.SES({"accessKeyId":  process.env["accessKeyId"], "secretAccessKey":  process.env["accessSecretKeyId"], "region": process.env["AWS_REGION"]}).sendEmail(params).promise();
  // Handle promise's fulfilled/rejected states
 sendPromise.then(
   function(data) {
     console.log("data-->",data.MessageId);
   }).catch(
     function(err) {
     console.error("errorr-->",err, err.stack);
   });

}

app.use('/prescriptiondelete',require('./routes/prescriptiondelete'));
app.use('/prescriptionview',require('./routes/prescriptionview'));
app.use('/prescriptionupload',require('./routes/prescriptionupload'));
app.use('/register',require('./routes/registration'))
app.use('/login',require("./routes/login"))
app.use('/dashboard',require("./routes/dashboard"))
module.exports = app;





