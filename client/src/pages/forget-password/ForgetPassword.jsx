import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./ForgetPassword.module.css";
import validationService from "../../utils/validation";
import Notification from "../../services/NotificationService";
import logo from "../../assets/Images/logo.png";
import Preloader from "../../components/preloader/Preloader";
import axios from "axios";


const ForgetPassword = () => {

  const history = useHistory();
  const [validation, setValidation] = useState({})
  const [form, setForm] = useState({
    email: "",
    resetCode: "",
    newpassword: "",
    confirmpassword: ""
  })
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [isResetCodeGenerated, setIsResetCodeGenerated] = useState(false);

  const validate = () => {
    const input = form;
    const errors = {};
    errors.email = !input.email ? "" : validationService.email(input.email) ? false : "Invalid Email Address";
    errors.newpassword = !input.newpassword ? "" : validationService.password(input.newpassword) ? false : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:"
    errors.resetCode = !input.resetCode ? "" : (input.resetCode.length === 10 && !isNaN(Number(input.resetCode))) ? false : "Enter valid reset code";

    setValidation(errors)
    return (errors.email === false && errors.newpassword === false && errors.resetCode === false) ? true : false;
  }

  const handleChange = (event) => {

    let input = form;
    input[event.target.name] = event.target.value;

    if (event.target.name === "email") {
      setIsResetCodeGenerated(false);
      input.resetCode = "";
    }

    if (form.newpassword !== form.confirmpassword && event.target.name === "confirmpassword") {
      let errors = { ...validation };
      errors.confirmPassword = "New password and confirm password are not same";
      setValidation(errors);
      return;
    } else {
      let errors = { ...validation };
      errors.confirmPassword = false;
      setValidation(errors);
    }

    setForm(input)
    setIsValid(validate())
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    let resetDetails = {};
    resetDetails.email = form.email;
    try {
      setisLoading(true)
      if (!isResetCodeGenerated && validationService.email(form.email) === true) {
        await axios.post(
          "api/auth/forgot-password",
          resetDetails
        );
        Notification.show({
          message: "Please check your email for verification code",
          status: true,
        });
        setIsResetCodeGenerated(true);
      } else if (isResetCodeGenerated && isValid && !validation.confirmPassword) {
        resetDetails.resetCode = form.resetCode;
        resetDetails.password = form.newpassword;

        await axios.post("api/auth/forgot-password", resetDetails);

        Notification.show({
          message: "Password successfully reseted",
          status: true,
        });

        setForm({ email: "", resetCode: "", newpassword: "", confirmpassword: "" });
        setIsResetCodeGenerated(false);
        setIsValid(false);
        setisLoading(false);
        history.push("/signin");
      } else {
        Notification.show({
          message: "Enter valid details",
          status: false,
        });
      }

      setisLoading(false);
    } catch (error) {
      Notification.show({
        message: error.response.data.message,
        status: false,
      });
      setisLoading(false)
    }
  }

  let content;

  if (isLoading) {
    content = <><Preloader /></>
  }
  else {
    content = <>
      <Link to="/">
        <img className={ classes.ForgetPasswordLogo } src={ logo } alt='forgot-password' />
      </Link>
      <div className={ classes.ForgetPasswordContainer }>
        <div className={ classes.ForgetPasswordContent }>
          <div className={ classes.ForgetPasswordHeading }>Forget password</div>
          <form onSubmit={ handleSubmit } className={ classes.Form }>
            <input type="email" name="email" placeholder="Enter your email" value={ form.email } onChange={ handleChange } />
            { validation.email && <span className="text-danger pb-3">{ validation.email }</span> }
            {
              isResetCodeGenerated ? (
                <>
                  <input type="text" name="resetCode" value={ form.resetCode } onChange={ handleChange } placeholder="resetCode" />
                  { validation.resetCode && <span className="text-danger pb-3">{ validation.resetCode }</span> }
                  <input type="password" name="newpassword" placeholder="New password" value={ form.newpassword } onChange={ handleChange } />
                  { validation.newpassword && <span className="text-danger pb-3">{ validation.newpassword }</span> }
                  <input type="password" name="confirmpassword" placeholder="Confirm password" value={ form.confirmpassword } onChange={ handleChange } />
                  { validation.confirmPassword && <span className="text-danger pb-3">{ validation.confirmPassword }</span> }
                </>
              ) : null
            }
            <div className="text-center">
              <button type="submit" className="text-white">{ !isResetCodeGenerated ? 'Get verification code' : 'Reset Password' }</button>
            </div>
          </form>
        </div>
      </div>
    </>
  }


  return (
    content
  );
};

export default ForgetPassword;