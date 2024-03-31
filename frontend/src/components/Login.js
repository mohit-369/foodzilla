// Import React and necessary hooks
import React, { useEffect, useState } from "react";
import Register from "./Register";
import { BrowserRouter, Link, Router, useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../services/authservices";
// Functional component for the login portal
const Login = () => {
  // State to manage email and password input values
  const [islogin, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Function to handle login button click
  const navigate = useNavigate();
  // Function to handle register button click
  useEffect(() => {
    handleLogin();
  }, []);
  const handleLogin = async () => {
    try {
      const userData = { email, password };
      const response = axios.post("http://localhost:8001/api/login", userData);
      const user = (await response).data.user.role;
      const token = (await response).data.token;
      console.log(user);
      console.log(token);
      if (token) {
        console.log("login");
        authService.setToken(token);
        if (user == "admin") {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <h1>User Login Portal</h1>
      {/* Email input */}
      <label>Email:</label>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Password input */}
      <br></br>
      <br></br>
      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <br></br>
      {/* Login button */}
      <button onClick={handleLogin}>Login</button>

      {/* Register button */}
      <Link to="/Register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Login;
