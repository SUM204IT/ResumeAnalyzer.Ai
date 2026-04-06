import React from "react";
import { useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { apiurl } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
      email:"",
      password:""
    })
  
    function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await apiConnector(
        "POST",
        apiurl.LOGINAPI_URL,
        {
          Email: formData.email,
          Password: formData.password,
        }
      );

      if (response?.data?.success) {
        // ✅ update redux state
        dispatch(
          login({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated:true
          })
        );
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful 🎉");

        // optional

        setTimeout(() => {
          navigate("/");
        }, 1000); // slight delay so user sees popup

      } else {
        toast.error(response?.data?.message || "Login failed");
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Login
        </h2>

        <form className="space-y-4" onSubmit={submitHandler}>
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
            Login
          </button>
        </form>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-blue-600 mt-4 text-center cursor-pointer">
          Forgot Password?
        </p>
        <p className="text-sm text-blue-600 mt-4 text-center cursor-pointer">
          Don't have an account, please <Link to={"/signup"} className="text-red-700 underline">Signup</Link>
        </p>
        </div>
      </div>
    </div>
  );
}