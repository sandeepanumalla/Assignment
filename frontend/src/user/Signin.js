import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import '../../node_modules/semantic-ui-css/semantic.min.css'
import {  authenticate, isAuthenticated } from "../auth/helper/index";
import UserDashboard from "./UserDashBoard";


const Signin = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
   
    loading: false,
    success: false,
    didRedirect: false
  });

  const { username, password, error, loading, didRedirect,success } = values;
  const { user } = isAuthenticated();


  /* const onItem = e => {
    setValues({...values, error: false, role: e})
   console.log("clicked me!", e)
  } */
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

var redirectRole ="Teacher"
  const performRedirect = () => {

    //TODO do a redirection
    if(didRedirect){
    
         return <Redirect to="/" />
      
    }
    if(isAuthenticated()){
      return <Redirect to="/" /> 
    }
  }
  const signin = user => {
    return fetch(`http://localhost:8000/api/users/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user) 
    }).then(data =>{
      if(data.ok===false){
        setValues({...values,error1:"Invalid details"})
        console.log("invalid details")
      }
      console.log("data",data)
      return data.json()
    })
    .catch(err =>{ return err} )
  }
  
  const onSubmit = event => {
    event.preventDefault();

    
    if( username === "" || password === ""  ){
      console.log("is it rinng")
      setValues({...values, error:" Please enter all the credentials to login"})
    }
    
    /* if(role === ""){
      console.log("running");
      setValues({...values, error:"please select user role"})
    } */
    
    else{
      signin({ username, password })
      .then((data,err) => {
       
     /*  console.log("onsubmit",data);
      console.log("onsubmit2",isAuthenticated()); */
      
      if (data === "user not found" || data === "incorrect password"){
       /*  console.log("da") */
        return setValues({...values, error:" Wrong username or password "})
      }
      /* else if(data === "Invalid role selected"){
        console.log("da2");
        return setValues({...values, error:" Invalid role selected"})
      } */
      
      
      /* if(isAuthenticated() === false){
        console.log("da2")
        return setValues({...values, error:"ivalued details"})
      } */

       else{ setValues({ ...values, error: "", loading: true });
        setValues({ ...values, error: false, loading: true });
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
              success: true
            });
          });}
        
      })
      .catch(err=>{console.log("signin request failed",err)});
    }

    
  };
  const LoadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  
 
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="col-md-6 offset-sm-3 text-left">
          
          </div>
          <form>
          
            <div className="form-group">
              <label className="text-dark">Username</label>
              <input
                onChange={handleChange("username")}
                value={username}
                className="form-control"
                type="text"
              />
            </div>

            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
          
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="">
      {LoadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
   
     
      <div className="signin bg-light text-white p-4"></div>
      <div className="signin bg-light text-white p-4"></div>
      <div className="signin bg-light text-white p-4"></div>
      <div className="signin bg-light text-white p-4"></div>
      <div className="signin bg-light text-white p-4"></div>
    </Base>
  );
};

export default Signin;
