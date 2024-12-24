import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('role',response.data.role);
      localStorage.setItem('userId',response.data.id);
      localStorage.setItem('name',response.data.name);

      const hasTakenTest = await checkUserTestStatus(response.data.id);

      if (hasTakenTest) {
        navigate("/welcomeuser");
      } else {
        navigate("/welcome");
      }

      if(response.data.role === "admin"){
        navigate("/adminpanel");
      }
      
      toast.success(response.data.message);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    toast.error(error.response.data.message);
    }
    
    setEmail("");
    setPassword("");
  };

  const checkUserTestStatus = async (userId) => {
    try {
      const response = await api.get(`/result/results/${userId}`); // Check results for specific user
      return response.data.result !== null; // Return true if a result exists
    } catch (error) {
      console.error("Error checking test status:", error);
      return false; // Assume not taken on error
    }
  };


  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow"
      >
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter the Your Email Id"
            className="border w-full p-2 mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p className="relative">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter the Your Password"
            className="border w-full p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-8 right-0 p-2 mb-4 font-serif rounded"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </p>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded font-serif p-2 text-xl"
        >
          Login
        </button>
        <p className="text-right">
        <button onClick={() => navigate("/forgot-password")} className="text-blue-500 p-2 mb-2 text-right font-serif rounded underline">Forgot Password</button>
        </p>
        <div className="p-2 font-serif rounded">Don't have an account? <a href="/register" className="text-blue-500 underline">Register</a></div>
      </form>
    </div>
  );
};

export default Login;