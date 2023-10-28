import axios from "axios";
import React, { useState } from "react";
import "./Login.css";


const Login = ({setisLogged}) => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");

 

  const handleLogin = async () => {
    setError("")
    let data = {
      Username: userName,
      Password: password,
      VaultGuid: "",
    };
    try {
      const response = await axios.post(
        "https://localhost:7053/api/Auth/Login",
        data
      );
      if (response.status === 200) {
        setError("Login successful")
        const user = response.data;
        setisLogged(true)
       
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
        setError("Invalid credentials");
    }
  };
  return (
    <div className="login-box">
      <h2>Login</h2>
      <div className="user-box">
        <input
        required
          onChange={(e) => {
            setuserName(e.target.value);
          }}
        ></input>
        <label>Username</label>
      </div>
      <div className="user-box">
        {" "}
        <input
        required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label>Password</label>
      </div>
      <button onClick={handleLogin}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>Login
      </button>
      {Error && <p style={{color:Error === "Invalid credentials"?"red":"green"}}>{Error}</p>}
    </div>
  );
};

export default Login;
