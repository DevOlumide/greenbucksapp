import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

/*  pages */
import Home from "./home";
import Landing from "./landing";
import Login from "./login";
import Register from "./register";
import Send from "./send";
import Payment from "./payment";

function App() {
  
  const isAuth = JSON.parse(localStorage.loggedIn);
  return (
    <div className="">
    <Router>
    <Switch>
    <Protected path="/home" isAuth={isAuth} component={Home} />
    <Protected path="/send" isAuth={isAuth} component={Send} />
    <Protected path="/checkout" isAuth={isAuth} component={Payment} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/" component={Landing} />
    </Switch>
    </Router>
    </div>
  );
}

function Protected({component: Component,isAuth,...rest}){
  if(isAuth){
    return(
      <Route {...rest} render= {props => <Component {...rest} {...props}/> } />
      );
  }else{
    return(
    <Redirect to="/login" />
    );
  }
}



export default App;
