const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModelSchemaCopy = require("../models/usermodels");
const UserBalanceSchemaCopy = require("../models/userbalanceModels");
const transactionSchemaCopy = require("../models/transactionModels");

router.post("/auth/register", async (request,response) => {
  
 const salt = bcrypt.genSaltSync(10);
 const hash = bcrypt.hashSync(request.body.password,salt);
 
 userModelSchemaCopy.find({$or: 
[{username: request.body.username}, 
 {email: request.body.email}]  
  }, (err,result) => {
     if(result){
       if(result.length !== 0){
       console.log(result);
       response.send(true);
     }else{
       const registered = new userModelSchemaCopy({
         username: request.body.username,
         password: hash,
         email: request.body.email,
         pin: request.body.pin
       });
       registered.save().then((data) => response.json(data)).catch(err => console.log(err));
       console.log(registered);
       }
     }
  });
});


/*    login routes */

router.post("/auth/login", (request, response) => {
  userModelSchemaCopy.find(
    
    /* checks either buck id or telephone number */
    
    {$or: [
      {email: request.body.username },{username: request.body.username}
      ]}, (err,result) => {
    if(result){
      if(request.body.password){
     if(bcrypt.compareSync(request.body.password,result[0].password)){
      console.log(result);
      response.send({isUnique: true,  user: result});
    }else{
      console.log("Incorrect password or username");
       response.send(false);
        }
      }
    }
    });
  });
  
  router.post("/balance", (request, response) => {
    // oldBalance
    
     var oldBalance = Number(0);
     
     // this one checks for old balance 
     
     UserBalanceSchemaCopy.find({
      buckID: request.body.buckID
   }, (err,result) => {
     
      if(err){
        console.log("No result");
      }
      
      // will set last balance as oldBalance
      if(result.length !== 0){
        result.map((bal) => {
          oldBalance = bal.balance;
          console.log(oldBalance)
        });
      }
    // creates a new instance of userbalanceSchemaCopy and add to last balance to new balance
    
    const newBalance  = new UserBalanceSchemaCopy({
      buckID: request.body.buckID,
      email: request.body.email,
      balance: Number(request.body.amount) + Number(oldBalance)
    });
    
    // saves result 
    
    newBalance.save().then((data) => response.json(data)).catch((err) =>
    console.log(err));
    
    
    console.log(newBalance);
  }).sort({_id:-1}).limit(1);
    
  });
  
router.post("/get-balance", (request,response) => {
  UserBalanceSchemaCopy.find({
    buckID: request.body.buckID
  }, (err, result) => {
    if(result){
      response.send(result);
      console.log(result);
    }
  }).sort({_id:-1}).limit(1)
});
  
 router.post("/send-money", async (request, response) => {
/*const amount_sent_from_sender = new transactionSchemaCopy({
   email: request.body.email,
   sender: request.body.sender,
   recipient: request.body.recipient,
   amount: request.body.amount
 });
 amount_sent_from_sender.save().
 */
 
 //  sends post request to balances and subtracts from sender 
 
  await UserBalanceSchemaCopy.find({email: request.body.email}, (err,result) => {
     if(result){
       result.map((sender) => {
         const sent = new UserBalanceSchemaCopy({
           buckID: sender.buckID,
           email: sender.email,
           balance: Number(sender.balance) - request.body.amount
         });
         sent.save().catch(err => console.log(err));
         console.log(sender);
       });
     }
    }).sort({_id:-1}).limit(1); 
    
    //adds to recipient account 
    
await UserBalanceSchemaCopy.find({buckID: request.body.recipient}, (recipientErr,recipientResult) => {
     if(recipientResult){
     recipientResult.map((recipient) => {
         const sent = new UserBalanceSchemaCopy({
           buckID: recipient.buckID,
           email: recipient.email,
           balance: Number(recipient.balance) + Number(request.body.amount)
         });
         sent.save().catch(err => console.log(err));
       console.log(recipient);
      });
     }
    }).sort({_id:-1}).limit(1);
   
  });
 
 
router.get("/read",(req,res) => {
  userModelSchemaCopy.find({}, (err,result) => {
    if(result){
      res.send(result);
    }
  });
});
module.exports = router;