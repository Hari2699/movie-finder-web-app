import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./SignIn.module.css";
import validationService from "../../utils/validation";
import { useAuth } from "../../context/auth/authState";
import Preloader from "../../components/preloader/Preloader";
import Notification from "../../services/NotificationService";
// import logo from "../../assets/Images/logo.png";

const SignIn = () => {
  const { login } = useAuth();
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const error = {};
    error.password = !userDetails.password
      ? ""
      : validationService.password(userDetails.password)
      ? false
      : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:";

    setErrors(error);
    return !error.email && !error.password ? true : false;
  };

  const onChangeHandler = (e) => {
    let user = userDetails;
    user[e.target.name] = e.target.value;
    setUserDetails(user);
    validate();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (errors.email || errors.password) {
      return;
    }

    if (!userDetails.email && !userDetails.password) {
      Notification.show({
        message: "Enter valid details",
        status: false,
      });
      return;
    }

    if (!userDetails.email) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter your email or username",
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
      await login(userDetails);
      Notification.show({
        message: "Successfully logged in",
        status: true,
      });
      setIsLoading(false);
      history.replace("/");
    } catch (error) {
      setIsLoading(false);
      Notification.show({
        message: error,
        status: false,
      });
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
        {/* <Link to="/">
          <img className={classes.logo} src={logo} alt="logo" />
        </Link> */}
      
        <div className={classes.SignIn}>
          <div className={classes.SignIn_Box}>
            <h1 className={classes.title_SU}>SIGN IN</h1>

            <form onSubmit={onSubmitHandler}>
              <input
                type="text"
                placeholder="Email or Username"
                name="email"
                value={userDetails.email}
                onChange={onChangeHandler}
              />
              {errors.email && (
                <span className="text-danger pb-3">{errors.email}</span>
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
