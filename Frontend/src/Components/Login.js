import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const SaveToLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };
    axios
      .post("http://localhost:3001/api/user/login", loginDetails)
      .then((res) => {
        SaveToLocalStorage(res.data.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="signup-text">
          Don’t have an account? <span>Sign up</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
