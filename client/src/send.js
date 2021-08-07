import React, {useState,useEffect} from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Send(){
 /***    states     ***/
 
 const [recipient,setRecipient] = useState("");
 const [amount, setAmount] = useState("");
 /*****    end states   ****/
 
 const changeAmount = (event) => {
   setAmount(event.target.value);
 }
 const changeRecipient = (event) => {
   setRecipient(event.target.value);
 }
const clicked = (event) => {
   event.preventDefault();
   const amountSent = {
     email: localStorage.email,
     sender: localStorage.username,
     recipient:recipient,
     amount: amount
   }
   Axios.post("http://localhost:3033/app/send-money",amountSent);
   
   setRecipient("");
   setAmount("");
 }
 
 useEffect(() => {
  
});
return(
  <div className="bg-customer">
  <div className="container">
  <form className="App">
  <input type="text" className="form-control mt-2" placeholder="Buck ID of recipient" onChange={changeRecipient} onBlur={changeRecipient} value={recipient}/>
  <input type="number" placeholder="Amount to send" onChange={changeAmount} value={amount} onBlur={changeAmount} className="form-control mt-2 border-success"/>
  <input type="submit" onClick={clicked} value="Send" className="btn btn-success mt-2"/>
  </form>
  </div>
  </div>
  );
  
}
export default Send
