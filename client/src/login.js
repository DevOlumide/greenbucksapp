import React, {useState} from "react";
import {FormHelperText, FormControl, Input, InputLabel, Button} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";


function Login(){
  
  //username also mean buck ID
  
  /*   start of states   */
  const [username, setUsername] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [err, setErr] = useState('');
 
  const [password, setPassword] = useState('');
  const [pswErr, setPswErr] = useState('');
  const [pswErrMsg, setPswErrMsg] = useState('');
  /*    end of states   */
  const validateName = () => {
    setErr("");
    setNameErrMsg("");
    setNameErr("");
    
   if(username.length === 0){
     setNameErr(true);
     setNameErrMsg("Buck ID cannot be empty");
     return false;
     }else {
     setNameErr(false);
     setNameErrMsg('');
     return true;
   }
 }
 
const validatePsw = () => {
   if(password.length === 0){
     setPswErr(true);
     setPswErrMsg("Password cannot be empty.");
     return false;
    } else {
     setPswErr(false);
     setPswErrMsg('');
     return true;
   }
 }
 
const changeName = (event) => {
   setUsername(event.target.value)
    validateName();
 }
  
  /*  sets the password on change */
  
 const changePsw = (event) => {
   setPassword(event.target.value)
   validatePsw()
 }
  
const submitForm = async (event) => {
   event.preventDefault();
   
const loginDetails = {
     username: username,
     password: password,

   }
 await Axios.post("http://localhost:3003/app/auth/login", loginDetails).then((result) => {
     if(result.data.isUnique){
       localStorage.loggedIn = "true";
       setUsername("");
       setPassword("");
       localStorage.username = result.data.user[0].username;
       localStorage.email = result.data.user[0].email;
       window.location.assign("/home");
       
     }else{
       localStorage.loggedIn = "false";
       localStorage.username = null;
       localStorage.email = null;
       setErr("Buck ID, Phone number or Password do not exist");
     }
     setNameErrMsg("");
     setNameErr(false);
     setPswErr(false);
     setPswErrMsg("")
   });
}
const styles = {
  backgroundColor: "#000000"
}
  return(
    <React.Fragment>
    <div className="">
    <div className="container text-center">
    <div className="card p-3 App">
    <p className="logo">Greenbucks</p>

    <p className="text-muted"dark>Sign in to start paying without stress.</p>
    <p className="text-danger">{err}</p>
    <form className="">
    <FormControl className="w-100" error={nameErr}>
    <InputLabel htmlFor="my-input">Buck ID or Email</InputLabel>
    <Input id="my-input" aria-describedby="my-helper-text" color="#10e310" size="small" type="text" onChange={changeName} onBlur={changeName} value={username} />
    <FormHelperText id="my-helper-text">{nameErrMsg}</FormHelperText>
    </FormControl>
    
     <FormControl className="w-100" error={pswErr}>
    <InputLabel htmlFor="my-input">Password</InputLabel>
    <Input id="my-input" aria-describedby="my-helper-text" color="#10e310" size="small" type="password" onChange={changePsw} onBlur={changePsw} value={password}/>
    <FormHelperText id="my-helper-text">{pswErrMsg}</FormHelperText>
    </FormControl>
    
    <Button color="primary" variant="contained" className="" onClick={submitForm} disableElevation>Sign in</Button>
    
    </form>
    <br />
    <a href="/register" className="App-link">Create a new account here</a>
    </div>
    </div>
    </div>
    </React.Fragment>
    );
}

export default Login;