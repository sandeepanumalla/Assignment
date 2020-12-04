import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
   
    password: "",
    error: "",
  
    success: false
  });

  const { username, fullname, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
   /*  setValues({ ...values, error: false }); */
    if(username === "" || fullname === "" || password ==="" ){
    setValues({ ...values, error:"please fill all the details" })
    }
    
    else{
    signup({ username, fullname, password })
      .then(data => {
         
          setValues({
            ...values,
            username: "",
            password: "",
            error: "",
            success: true,
            
          });
        
      })
      .catch(console.log("Error in signup"));
    }
  };

   const onItemClick = event => {
     setValues({...values, error: false, role: event})
    console.log("clicked me!", event)
   }
  const signUpForm = () => {
    return (
      <div className="row">
      

        <div className="col-md-6 offset-sm-3 text-left">
        <div className="col-md-6 offset-sm-3 text-left">
        
        </div>
       
          <form>
            <div className="form-group">
              <label className="text-dark">Username</label>
              <input
                className="form-control"
                onChange={handleChange("username")}
                type="text"
                value={username}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Fullname</label>
              <input
                className="form-control"
                onChange={handleChange("fullname")}
                type="text"
                value={fullname}
              />
            </div>

            
            <div className="form-group">
            <label className="text-dark">Password</label>
            <input
              onChange={handleChange("password")}
              className="form-control"
              type="password"
              value={password}
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

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
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

  return (
    <Base title="Sign up page" description="">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
     
      <div className="signin bg-light text-white p-4"></div>
      <div className="signin bg-light text-white p-4"></div>
      <div className="signin bg-light text-white p-4"></div>
      <div className="signin bg-light text-white p-4"></div>
      <div className="signin bg-light text-white p-4"></div>
    </Base>
  );
};

export default Signup;
