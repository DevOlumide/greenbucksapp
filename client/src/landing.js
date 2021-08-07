import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


function Landing(){
  return(
  <div className="landing App">
  <div className="landing-img-container">
  <div className="container">
  <h1>Stress-free peer-to-peer payments</h1>
  <p className="text-dark">No bank issues. No internet problems. No undecided transactions. No unnecessary bank charges.</p>
  </div>
  </div>
  <div className="landing-btn-container pt-5 mx-3">
  <a href="/login" className="btn btn-outline-white w-100 mt-5">Get Started</a>
  </div>
  </div>
  );
}

export default Landing;