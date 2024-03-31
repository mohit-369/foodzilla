// Import React and necessary hooks
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Functional component for the register portal
const Register = () => {
  const navigate = useNavigate();
  // State to manage input values
  const [username, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  // Function to handle register button click
  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/signup",
        { username, email, phone, password, role }
        // { withCredentials: true }
      );
      // const { success, message } = data;
      console.log("successfully loged in");
      console.log("data:", response.data.role);
      if (response.data.role === "admin") {
        navigate("/admin");
      } else if (response.data.role === "owner") {
        navigate(`/ResDetails/${phone}`);
      } else if (response.data.role === "user") {
        navigate("/Restorent");
      } else {
        console.log("no user found");
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Register clicked");
  };

  return (
    <div className="Register">
      <h1>User Registration Portal</h1>
      {/* Name input */}
      <label>Name:</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setName(e.target.value)}
      />
      <br></br>
      {/* Phone input */}
      <label>Phone:</label>
      <input
        type="text"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br></br>
      {/* Email input */}
      <label>Email:</label>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br></br>
      {/* Password input */}
      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <label>Role:</label>
      <input
        type="role"
        placeholder="Enter your role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <br></br>
      {/* Register button */}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
