import React, {useState} from "react";
import {FormHelperText, FormControl, Input, InputLabel, Button} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";


function Register(){
  
  /* **** start of state **** */
  const [username, setUsername] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [nameErrMsg, setNameErrMsg] = useState('');
  
  
  const [password, setPassword] = useState('');
  const [pswErr, setPswErr] = useState('');
  const [pswErrMsg, setPswErrMsg] = useState('');
  
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  
  const [pin, setPin] = useState('');
  const [pinErr, setPinErr] = useState('');
  const [pinErrMsg, setPinErrMsg] = useState('');
  
  const [err, setErr] = useState('');
  /**     end of states   ****/
  
  
 /*      validates username   */
 //  Username had become buck ID 
 
 const validateName = () => {
   if(username === ""){
     setNameErr(true);
     setNameErrMsg("Buck ID cannot be empty");
     return false;
   }else if(username.length < 6){
       setNameErr(true)
       setNameErrMsg("Username must be 6 or more characters long.");
       return false;
     } else if (!/\w\d/.test(username)){
       setNameErr(true);
       setNameErrMsg("Buck ID must contain letters but end with numbers e.g greenbucks328")
       return false;
       } else if (username.indexOf(" ") >= 0){
       setNameErr(true);
       setNameErrMsg("Spaces are not allowed");
       return false;
         }else {
     setNameErr(false);
     setNameErrMsg('');
     return true;
   }
 }
 

 /***    validates psw     **/
 
 const validatePsw = () => {
   if(password === ''){
     setPswErr(true);
     setPswErrMsg("Password cannot be empty.");
     return false;
   }else if(password.length < 6){
       setPswErr(true);
       setNameErrMsg("Password must be 6 or more characters long ");
       return false;
       
     }else if (!/[A-Za-z]\d/.test(password)){
       setPswErr(true);
       setPswErrMsg("Password must contain letters and numbers e.g buckpass4567")
       return false;
       } else if (password.indexOf(" ") >= 0){
       setPswErr(true);
       setPswErrMsg("Spaces are not allowed");
       return false;
       } else {
     setPswErr(false);
     setPswErrMsg('');
     return true;
   }
 }
 
 /*   validates telephone  */
 
  const validateEmail = () => {
   if(email === ""){
     setEmailErr(true);
     setEmailErrMsg("Telephone number cannot be empty.");
     return false;
   }else if(email.length < 5){
     setEmailErr(true);
     setEmailErrMsg("Email seem too short");
     return false;
   }else if (email.indexOf(" ") >= 0){
       setEmailErr(true);
       setEmailErrMsg("Spaces are not allowed");
       return false;
         } else{
     setEmailErr(false);
     return true;
   }
  }
  
  /*   validates pin   */
  
  const validatePin = () => {
   if(pin === ""){
     setPinErr(true);
     setPinErrMsg("Pin cannot be empty");
     return false;
   }else if(pin.length !== 5){
     setPinErr(true);
     setPinErrMsg("Pin must be 5 chatacter long.");
     return false;
     }else if (pin.indexOf(" ") >= 0){
       setPinErr(true);
       setPinErrMsg("Spaces are not allowed");
       return false;
     }else{
     setPinErr(false);
     return true;
   }
  }
  
  /*  sets the username on change */
  
 const changeName = (event) => {
   setUsername(event.target.value)
    validateName();
 }
  
  /*  sets the password on change */
  
 const changePsw = (event) => {
   setPassword(event.target.value)
   validatePsw()
 }
  
  /*  sets the telephone on change */
  
 const changeEmail = (event) => {
   const {value} = event.target;
   setEmail(value);
   validateEmail();
 }
  
  /*  sets the pin on change */
  
 const changePin = (event) => {
   const {value} = event.target;
   setPin(value.slice(0,5));
   validatePin();
 }
  
  /*  sends user data to server  */
  
 const submitForm = async (event) => {
   event.preventDefault();
   
   const userDetails = {
     username: username,
     password: password,
     email: email,
     pin: pin
   }
   if(validateName() && validatePsw() && validateEmail() && validatePin()){
   await Axios.post("http://localhost:3033/app/auth/register", userDetails).then((result) => {
    if(result.data.username === undefined){
      localStorage.loggedIn = "false";
      localStorage.username = null;
      localStorage.email = null;
    
      setErr("Buck Id or phone number already exist");
     }else{
       localStorage.loggedIn = "true";
       localStorage.username = username;
       localStorage.email = email;
     
       
   /* clears inputs after data has been sent to backend */
   
   setUsername('');
   setPassword('');
   setEmail('');
   setPin('');
   setErr('');
   window.location.assign("/home");
     }
   });
   
     } else {
     setErr("Something seem to be wrong");
   }
 }
  // Username now becomes buck_ID
  
  return (
    <div className="container text-center">
    <div className="card p-3 App">
    <p className="logo">Greenbucks</p>
    <p className="text-muted">Register to get started right away</p>
    <p className="text-danger">{err}</p>
    <form className="">
    <FormControl className="w-100" error={nameErr}>
    <InputLabel htmlFor="my-input">Buck ID</InputLabel>
    <Input id="my-input" aria-describedby="my-helper-text" color="#10e310" size="small" type="text" onChange={changeName} onBlur={changeName} value={username} />
    <FormHelperText id="my-helper-text">{nameErrMsg}</FormHelperText>
    </FormControl>
    
    
    <FormControl className="w-100" error={pswErr}>
    <InputLabel htmlFor="my-input">Password</InputLabel>
    <Input id="my-input" aria-describedby="my-helper-text" color="#10e310" size="small" type="password" onChange={changePsw} onBlur={changePsw} value={password}/>
    <FormHelperText id="my-helper-text">{pswErrMsg}</FormHelperText>
    </FormControl>
    
    <FormControl className="w-100" error={emailErr}>
    <InputLabel htmlFor="my-input">Email Address</InputLabel>
    <Input id="my-input" aria-describedby="my-helper-text" color="#10e310" size="small" type="email" onChange={changeEmail} onBlur={changeEmail} value={email} />
    <FormHelperText id="my-helper-text">{emailErrMsg}</FormHelperText>
    </FormControl>
    
    <FormControl className="w-100" error={pinErr}>
    <InputLabel htmlFor="my-input">5 digits pin</InputLabel>
    <Input id="my-input" aria-describedby="my-helper-text" color="#10e310" size="small" type="number" onChange={changePin} onBlur={changePin} value={pin}/>
    <FormHelperText id="my-helper-text">{pinErrMsg}</FormHelperText>
    </FormControl>
    <FormControl>
    <Button color="primary" variant="contained" className="" onClick={submitForm} fullWidth disableElevation>Register</Button>
    </FormControl>
    
    
    <br />
    <div className="">
    Have an account? 
    <a href="/login"> login here</a>
    </div>
    </form>
    </div>
    </div>
    );
}

export default Register;