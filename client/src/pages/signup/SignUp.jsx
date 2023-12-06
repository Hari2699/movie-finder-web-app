import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./SignUp.module.css";
import validationService from '../../utils/validation'
import getRandomImage from './../../utils/randomImagePicker';
// import logo from "../../assets/Images/logo.png";
import { useAuth } from '../../context/auth/authState'
import Preloader from "../../components/preloader/Preloader";
import Notification from "../../services/NotificationService";

const SignUp = () => {
  const { signup } = useAuth()
  const history = useHistory()

  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
    imageUrl: getRandomImage()
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const error = {};
    error.username = !userDetails.username ? "" : validationService.username(userDetails.username) ? false : "Minimum 5 characters, no spaces and special characters";
    error.email = !userDetails.email ? "" : validationService.email(userDetails.email) ? false : "Invalid Email Address";
    error.password = !userDetails.password ? "" : validationService.password(userDetails.password) ? false : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:";
    error.confirmPassword = !userDetails.confirmPassword ? "" : userDetails.password === userDetails.confirmPassword ? false : "password and confirm password are not same";
    setErrors(error);
    return (!error.email && !error.password && !error.username && !error.confirmPassword) ? true : false;
  }

  const onChangeHandler = (e) => {
    let user = userDetails
    user[e.target.name] = e.target.value;

    if (userDetails.password !== userDetails.confirmPassword && e.target.name === "confirmPassword") {
      let error = { ...errors };
      error.confirmPassword = "password and confirm password are not same";
      setErrors(error);
      return;
    } else {
      let error = { ...errors };
      error.confirmPassword = false;
      setErrors(error);
    }

    setUserDetails(user);
    validate();
  }

  const dateFormatter = (date) => new Date(date).toUTCString().substring(5, 16)


  const onSubmitHandler = async (e) => {
    e.preventDefault()

    validate();
    if (errors.username || errors.email || errors.password || errors.confirmPassword) {
      return
    }

    if (!userDetails.email && !userDetails.password && !userDetails.username && !userDetails.confirmPassword && !userDetails.dob) {
      Notification.show({
        message: "Enter valid details",
        status: false
      })
      return
    }

    if (!userDetails.username) {
      setErrors((prevState) => ({ ...prevState, username: 'Please enter your username' }))
      return
    }

    if (!userDetails.dob) {
      setErrors((prevState) => ({ ...prevState, dob: 'Please enter your date of birth' }))
      return
    }

    if (!userDetails.email) {
      setErrors((prevState) => ({ ...prevState, email: 'Please enter your email' }))
      return
    }

    if (!userDetails.password) {
      setErrors((prevState) => ({ ...prevState, password: 'Please enter your password' }))
      return
    }

    if (!userDetails.confirmPassword) {
      setErrors((prevState) => ({ ...prevState, confirmPassword: 'Please enter your confirm password' }))
      return
    }

    try {
      setIsLoading(true)
      await signup({
        ...userDetails,
        dob: dateFormatter(userDetails.dob)
      })
      Notification.show({
        message: "Successfully created account",
        status: true
      })
      setIsLoading(false)
      history.push('/signin')

    } catch (error) {
      setIsLoading(false)
      Notification.show({
        message: error,
        status: false
      })
    }
    try {
      setIsLoading(true);
  
      const response = await fetch('http://127.0.0.1:8000/accounts/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userDetails.username,
          email: userDetails.email,
          dob: userDetails.dob,
          password: userDetails.password
        }),
      });
  
      const data = await response.json();
      console.log(data);
  
      Notification.show({
        message: "Successfully created account",
        status: true
      });
  
      setIsLoading(false);
      history.push('/signin');
  
    } catch (error) {
      setIsLoading(false);
      Notification.show({
        message: error.message || "An error occurred",
        status: false
      });
      console.error('Error:', error);
    }
  }

  let content;

  if (isLoading) {
    content = <><Preloader /> </>
  }
  else {
    content = (
      <>
        {/* <Link to="/">
          <img className={ classes.logo } src={ logo } alt='logo' />
        </Link> */}
        <div className={ classes.SignUp }>

          <div className={ classes.signUp_box_wrapper }>
            <div className={ classes.SignUp_Box }>
              <h1 className={ classes.title_SU }>SIGN UP</h1>

              <form onSubmit={ onSubmitHandler }>
                <input
                  type="text"
                  placeholder="Username"
                  name='username'
                  value={ userDetails.username }
                  onChange={ onChangeHandler }
                />
                { errors.username && <span className="text-danger pb-3">{ errors.username }</span> }
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={ userDetails.email }
                  onChange={ onChangeHandler }
                />
                { errors.email && <span className="text-danger pb-3">{ errors.email }</span> }
                <input
                  placeholder="DOB"
                  type="text"
                  onFocus={ (e) => (e.target.type = "date") }
                  name='dob'
                  value={ userDetails.dob }
                  min="1940-01-01"
                  max="2010-12-31"
                  onChange={ onChangeHandler }
                />
                { errors.dob && <span className="text-danger pb-3">{ errors.dob }</span> }
                <input
                  type="password"
                  placeholder="Password"
                  name='password'
                  value={ userDetails.password }
                  onChange={ onChangeHandler }
                />
                { errors.password && <span className="text-danger pb-3">{ errors.password }</span> }
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name='confirmPassword'
                  value={ userDetails.confirmPassword }
                  onChange={ onChangeHandler }
                />
                { errors.confirmPassword && <span className="text-danger pb-3">{ errors.confirmPassword }</span> }
                <input type="submit" value="SIGN UP" />
              </form>
              <div className={ classes.bottomLinkWrapper }>
                <Link to="/signin" className={ classes.BottomLinks }>Existing User ?</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (content);
};

export default SignUp;
