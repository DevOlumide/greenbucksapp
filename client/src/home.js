import React, {useState,useEffect} from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Alert} from "@material-ui/lab";
import {Button} from "@material-ui/core";


function Home(){
  
/**    states    ***/

const [balance,setBalance] = useState("0000.00");

/**   end of states  ***/
  
useEffect(() => {
     Axios.post("http://localhost:3033/app/get-balance", {buckID: localStorage.username}).then((response) => {
      if(response.data.length !== 0){
        response.data.map((result) => {
        setBalance(result.balance);
        })
      }
     })
   });
  
  return(
    <div className="container">
    <div className="App">
    <i className="text-muted">Hello, {localStorage.username}</i>
     <div className="card p-3">
     <p className="text-muted">My balance</p>
     <p className="x-large text-green">&#8358;{balance}</p>
     <div className="text-center">
     <a className="btn btn-outline-success mx-1" href="/send">Send money</a>
     <a className="&#8358; btn btn-outline-warning mx-1" href="/checkout">Fund account</a>
     </div>
      </div>
      <br />
  <Alert type="info">This is just a demo. Full features are not available yet.</Alert>
     </div>
   </div>
    );
}

export default Home;
