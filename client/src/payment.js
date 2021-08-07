import React, {useState} from 'react';
import { usePaystackPayment } from 'react-paystack';
import {FormHelperText, FormControl, Input, InputLabel, Button} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import './App.css';
  
  
  const Payment = () => {
  
  /***  start of states   
  *** buck is all concerned about funding input form.  ***/
    
  const [bucks, setBucks] = useState("");
  const [buckErr, setBuckErr] = useState(false);
  const [buckErrMsg, setBuckErrMsg] = useState("");
  
  /**** end of states  ***/
  
  const validateBuckInp = () => {
    if(bucks.length === 0){
      setBuckErr(true);
      setBuckErrMsg("This input os required");
    }
  }
  const changeBuck = (event)  => {
    setBucks(event.target.value)
  }
  
  const config = {
      reference: (new Date()).getTime().toString(),
      email: localStorage.email,
      amount: bucks * 100,
      publicKey:"pk_test_49a423cbd5655f0aa048d514e1f16a70ea237795"
  };
  
  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    const balanceAmount = {
      buckID: localStorage.username,
      email: localStorage.email,
      amount: bucks
    };
    
    Axios.post("http://localhost:3033/app/balance", balanceAmount);
   
    window.location.assign("/home");
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

      const initializePayment = usePaystackPayment(config);
      return (
    <div  className="container">
    <h1>Add some bucks to your wallet</h1>
    <FormControl className="w-100" error={buckErr}>
    <InputLabel htmlFor="my-input">Amount to add</InputLabel>
    <Input id="my-input" aria-describedby="my-helper-text" color="#10e310" size="small" type="number" onChange={changeBuck} onBlur={changeBuck} value={bucks}/>
    <FormHelperText id="my-helper-text">{buckErrMsg}</FormHelperText>
    </FormControl>
        
            <button onClick={() => {
                initializePayment(onSuccess, onClose)
            }} className="btn btn-success">Add bucks</button>
        </div>
      );
  };
  
  function App() {
    return (
      <div className="App">
        <Payment />
      </div>
    );
  }
  
  export default App