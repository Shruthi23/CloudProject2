const { response } = require('express');
const express=require('express');
const router=express.Router();
const AWS = require("aws-sdk");
var uuid = require('uuid');
require('dotenv').config();

// const bcrypt=require('bcryptjs');
// const passport=require('passport');
// const AWS = require('aws-sdk');
// const keys=require('./../config/keys');
// const User = require('./../models/user');

//Login Page

router.get('/',(req,res)=>res.render('login'));

//Register Page
 router.get('/register',(req,res)=>res.render('register'));
 router.get('/reg',(req,res)=>res.send("heelo"));

//  router.post('/register', (req,res)=>{
//      console.log("register", process.env["DYNAMODB_TABLE_DOCTOR"])
//     const { name, email, password, confirm,phone} = req.body;
//     console.log("name",name,email,confirm,password,phone)
  
//     if(name && email && password&& confirm&& phone){
//         console.log("condition satisfied", process.env["DYNAMODB_TABLE_DOCTOR"])
//     const db = new AWS.DynamoDB();
//     const dbInput = {
//           TableName: process.env["DYNAMODB_TABLE_DOCTOR"],
//           Item: {
//             id: { S: uuid.v1() },
//             docName: { S: req.body.name },
//             docEmail: { S: req.body.email },
//             docSpec: { S: req.body.docSpec },
//             current_doctor: { BOOL: true },
//           },
//         };
//         db.putItem(dbInput, function (putErr, putRes) {
//           if (putErr) {
//             console.log("Failed to put item in dynamodb: ", putErr);
//             res.status(404).json({
//               err: "Failed to Upload!",
//             });
//           } else {
//             console.log("Successfully written to dynamodb", putRes);
//             res.status(200).json({
//               message: "Upload is successful!",
//             });
//           }
//         });
//     }
//   });
  

 

// //Register Handle
// router.post('/register', (req,res)=>{
//     //const { name, email, password, password2,phone} = req.body;
//     console.log("req",req)
//     res.send({"success":true})
    // let errors = [];

    // //check required fields
    // if(!name || !email || !password ||!password2 || !phone){
    //     errors.push({ msg:'Please fill in all fields!' });
    // }

    // //check password match
    // if(password != password2){
    //     errors.push({msg: 'Passwords do not match!'});
    // }

    // //check pass length
    // if(password.length < 6){
    //     errors.push({ msg: 'Password should be at least 6 characters'});
    // }

    // if(phone.length < 6){
    //     errors.push({ msg: 'Mobile number should be at least 10 digits'});
    // }

    // if(errors.length > 0){
    //     res.render('register',{
    //         errors,
    //         name,
    //         email,
    //         password,
    //         password2,
    //         phone
    //     });
    // }
    // else{
        
    //     const dynamoDbObj = require('./../models/connect');

    //     let user = () => {
    //         var params = {
    //             TableName: 'user',
    //             Key: {
    //                 'email': email
    //             }
    //         };

    //         dynamoDbObj.get(params, function (err, data) {
    //             if (err){ throw err}
    //             else{
    //                 if( Object.keys(data).length > 0){
    //                 errors.push({ msg:'Email is already registered' });
    //                     res.render('register',{
    //                         errors,
    //                         name,
    //                         email,
    //                         password,
    //                         password2,
    //                         phone
    //                 });
    //                 }
    //             else{

    //                 //update in dynamodb
    //                 var input = {
    //                     'email': email, 'name': name,
    //                     'level': 'U', 'password': password , 'phone': phone
    //                 };
    //                 var params = {
    //                     TableName: "user",
    //                     Item:  input
    //                 };
        
    //                 dynamoDbObj.put(params, function (err, data) {
        
    //                     if (err) {
    //                         console.log(err);
    //                     } else {
    //                         req.flash('success_msg','You are now registered!!');
    //                         res.redirect('/users/login');
    //                     }
    //                 });
    //             }
    //             }
    //         })
    //     } 

    //     user();        
    // }
//});

//Login Handle
// router.post('/login', (req,res, next) => {
//     passport.authenticate('local',{
//         successRedirect: '/dashboard',
//         failureRedirect: '/users/login',
//         failureFlash: true
//     })(req, res, next);
// });

//logout handle
// router.get('/logout',(req,res,next) => {
//     req.logout();
//     req.flash('success_msg','You are Logged out');
//     res.redirect('/users/login');
// });

//google oauth
// router.get('/auth/google',
//     passport.authenticate('google', {
//     scope:['profile','email']
// }));

// router.get('/auth/google/callback',passport.authenticate('google'),(req,res,next) => {
//     res.redirect('/dashboard');
// });

// //facebook oauth
// router.get('/auth/facebook', 
//     passport.authenticate('facebook'));

// router.get('/auth/facebook/callback',passport.authenticate('facebook'), (req,res,next) => {
//     res.redirect('/dashboard');
// });

// router.get('/auth/amazon',
//   passport.authenticate('amazon'));

// router.get('/auth/amazon/callback', 
//   passport.authenticate('amazon', { failureRedirect: '/users/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/dashboard');
//   });

module.exports=router;