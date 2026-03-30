import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {apiConnector} from "../services/apiConnector";
import { apiurl } from "../services/api";

export default function Signup() {

  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    Name:"",
    email:"",
    password:""
  })

  // async function sendotp(){
    
  // }

  async function changeHandler(e) {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
}

  async function submitHandler(e){
    e.preventDefault();

    //api calling
    try {
      const response = await apiConnector("POST", apiurl.SIGNUPAPI_URL, {
        Name: formData.Name,
        Email: formData.email,
        Password: formData.password
      })
    console.log("Signup success:", response.data);
    alert("Signup successful");
    navigate("/login");

    } catch (error) {
      if (error.response) {
      console.log("Backend Error:", error.response.data.message);
      alert(error.response.data.message);
    }

    else if (error.request) {
      console.log("Network Error");
      alert("Server not responding");
    }

    else {
      console.log("Error:", error.message);
    }
    }

    


  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={submitHandler}>
          <input
            type="text"
            name="Name"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={changeHandler}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={changeHandler}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={changeHandler}
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">
            <Link to="/login">
            login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}