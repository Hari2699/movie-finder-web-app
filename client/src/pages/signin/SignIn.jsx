import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SignIn.module.css"; // Import the CSS file

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/moviefinder/login", {
        email,
        password,
      });
      
      console.log('Login success:', response.data);

      // Add logic here for successful login if needed

    } catch (error) {
      console.error('Login error:', error); 

      // Add logic here for handling login error if needed
    }
  };

  return (
    <form className="SignIn login-form" onSubmit={onSubmitHandler}>
      <div className="SignIn_Box">
        <h1 className="title_SU">SIGN IN</h1>

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input type="submit" value="SUBMIT" />

        <div className="bottomLinkWrapper">
          <Link to="/forgot-password" className="BottomLinks">
            Forgot Password?
          </Link>

          <Link to="/signup" className="BottomLinks">
            New User?
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
