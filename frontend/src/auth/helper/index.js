import { API } from "../../backend";
import axios from 'axios';



export const signup = user => {
  return fetch(`http://localhost:8000/api/users/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};



export const authenticate = (data, next) => {
 
  localStorage.setItem("jwt", JSON.stringify(data));
  console.log("maind data",data)
  next();

};


export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`http://localhost:8000/api/users/signout`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
  /* if (typeof window == "undefined") {
    return false;
  } */
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};


export const api = axios.create({
  baseURL: 'http://localhost:8000/api/users',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${isAuthenticated().token}`
  }
})

export const courses = async () => {
  
  return await fetch(`http://localhost:8000/api/users/all-posts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify()
  })
    .then(response => {
      return response.json();
      console.log(response.json())
    })
    .catch(err => console.log(err));
 
};


