import React, { useState } from "react";
import "../Styles/logins.css"; // Adjust the path according to your file structure
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Ensure Navbar import is correct

function Jztworkers2() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [JztworkersStatus, setJztworkersStatus] = useState("");
  const navigate = useNavigate();

  const Jztworkers = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
      });

      if (response.data.message) {
        setJztworkersStatus(response.data.message);
      } else {
        setJztworkersStatus("Login successful! Redirecting...");
        navigate("/jztworkers3"); // Redirect upon successful login
      }
    } catch (error) {
      console.error("Login error: ", error);
      setJztworkersStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="loginForm">
          <form onSubmit={Jztworkers}>
            <h4>Login Here</h4>
            <label htmlFor="username">Username*</label>
            <input
              className="textInput"
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
              required
            />
            <label htmlFor="password">Password*</label>
            <input
              className="textInput"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
            <input className="button" type="submit" value="Login" />
            <h1
              style={{
                color: "red",
                fontSize: "15px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {JztworkersStatus}
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Jztworkers2;
