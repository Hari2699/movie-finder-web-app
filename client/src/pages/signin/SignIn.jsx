import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./SignIn.module.css";
import validationService from "../../utils/validation";
// import { useAuth } from "../../context/auth/authState";
import Preloader from "../../components/preloader/Preloader";
import Notification from "../../services/NotificationService";
import logo from "../../assets/Images/logo.png";

const SignIn = () => {
  // const { login } = useAuth(); 
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const error = {};
    error.password = !userDetails.password
      ? ""
      : validationService.password(userDetails.password)
      ? false
      : " ";

    setErrors(error);
    return !error.username && !error.password ? true : false;
  };

  const onChangeHandler = (e) => {
    let user = userDetails;
    user[e.target.name] = e.target.value;
    setUserDetails(user);
    validate();
  };

  
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // existing validation logic
    if (errors.username || errors.password) {
        return;
    }

    if (!userDetails.username) {
        setErrors((prevState) => ({
            ...prevState,
            username: "Please enter your username",
        }));
        return;
    }

    if (!userDetails.password) {
        setErrors((prevState) => ({
            ...prevState,
            password: "Please enter your password",
        }));
        return;
    }

    try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8000/accounts/login/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userDetails.username,
                password: userDetails.password
            })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify({ username: userDetails.username }));    
            Notification.show({
                message: "Successfully logged in",
                status: true,
            });
            history.replace("/");
        } else {
            Notification.show({
                message: data.message || "Incorrect username or password",
                status: false,
            });
        }
    } catch (error) {
        Notification.show({
            message: "An error occurred during login",
            status: false,
        });
    } finally {
        setIsLoading(false);
    }
};

  let content;

  if (isLoading) {
    content = (
      <>
        <Preloader />{" "}
      </>
    );
  } else {
    content = (
      <>
        <Link to="/">
          <img className={classes.logo} src={logo} alt="logo" />
        </Link>
      
        <div className={classes.SignIn}>
          <div className={classes.SignIn_Box}>
            <h1 className={classes.title_SU}>SIGN IN</h1>

            <form onSubmit={onSubmitHandler}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={userDetails.username}
                onChange={onChangeHandler}
              />
              {errors.username && (
                <span className="text-danger pb-3">{errors.username}</span>
              )}

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userDetails.password}
                onChange={onChangeHandler}
              />
              {errors.password && (
                <span className="text-danger px-5 pb-3">{errors.password}</span>
              )}

              <input type="submit" value="SUBMIT" />
            </form>
            <div className={classes.bottomLinkWrapper}>
              <Link to="/forgot-password" className={classes.BottomLinks}>
                Forgot Password ?
              </Link>

              <Link to="/signup" className={classes.BottomLinks}>
                New User ?
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default SignIn;
