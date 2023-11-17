import React, { useEffect, useState } from "react";
import TopBar from "../../components/top-bar/TopBar";
import axios from "axios";
import classes from "./Profile.module.css";
import posterImage from "../../assets/Images/mk.jpg";
import MovieRow from "./../../components/movie-row/MovieRow";
import Notification from "../../services/NotificationService";
import validationService from "../../utils/validation";
import Footer from "../../components/footer/Footer";
import { useAuth } from "./../../context/auth/authState";
import { useMovies } from "../../context/movies/movieState";

import { Container, Row, Col } from "react-bootstrap";
import Preloader from "../../components/preloader/Preloader";

const Profile = () => {
    const { token, user } = useAuth();
    const { getHistory } = useMovies();

    const [history, setHistory] = useState([])

    const [validation, setValidation] = useState({});
    const [form, setForm] = useState({
        newPass: "",
        currPass: "",
        confirmPass: "",
    });
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    const validate = () => {
        const input = form;
        const errors = {};
        errors.newPass = !input.newPass
            ? ""
            : validationService.password(input.newPass)
                ? false
                : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:";
        errors.currPass = !input.currPass
            ? ""
            : validationService.password(input.currPass)
                ? false
                : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:";
        setValidation(errors);
        return !errors.currPass && !errors.newPass && !errors.confirmPass
            ? true
            : false;
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const hist = await getHistory()
                setData(hist)
            } catch (error) {
                Notification.show({
                    message: error,
                    status: false,
                });
            }
        };

        fetchDetails();
    }, [user]);

    const setData = (hist) => {
        setHistory(hist)
    }
    
    const handleChange = (event) => {
        let input = form;
        input[event.target.name] = event.target.value;

        if (
            form.newPass !== form.confirmPass &&
            event.target.name === "confirmPass"
        ) {
            let errors = { ...validation };
            errors.confirmPass = "New password and confirm password are not same";
            setValidation(errors);
            return;
        } else {
            let errors = { ...validation };
            errors.confirmPass = false;
            setValidation(errors);
        }

        setForm(input);
        setIsValid(validate());
    };

    const handleSubmit = async (e) => {
        setisLoading(true);
        e.preventDefault();

        try {
            if (isValid) {
                await axios.put("/api/auth/change-password", form, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                Notification.show({
                    message: "Password successfully changed",
                    status: true,
                });

                setForm({ newPass: "", currPass: "", confirmPass: "" });
                setIsValid(false);
            } else {
                Notification.show({
                    message: "Please enter valid details",
                    status: false,
                });
            }

            setisLoading(false);
        } catch (error) {
            Notification.show({
                message: error.response.data.message,
                status: false,
            });
            setisLoading(false);
        }
    };

    
    if (!user || isLoading) {
        return (
            <>
                <TopBar title="Loading..." />
                <Preloader />
            </>
        )
    }

    return (
        <>
            <div>
                <TopBar title="profile" />
                <div className={ classes.ProfileContent }>
                    <div className={ classes.ProfilePic }>
                        <img src={ user ? user.imageUrl : posterImage } alt="profile" />
                    </div>
            
                    <div className={ classes.Details }>
                        <h2 className={ classes.Subtitle }>Your Details</h2>
            
                        <div className={ classes.DetailsContent }>
                            <Container>
                                <Row className={ classes.DetailsContentRow }>
                                    <Col lg={ 6 } md={ 5 } xs={ 12 } className={ classes.DetailsKey }>
                                        Username
                                    </Col>
                                    <Col lg={ 6 } md={ 8 } xs={ 12 } className={ classes.DetailsValue }>
                                        { user.username }
                                    </Col>
                                </Row>
                                <hr />
                                <Row className={ classes.DetailsContentRow }>
                                    <Col lg={ 6 } md={ 5 } xs={ 12 } className={ classes.DetailsKey }>
                                        Email
                                    </Col>
                                    <Col lg={ 6 } md={ 8 } xs={ 12 } className={ classes.DetailsValue }>
                                        { user.email }
                                    </Col>
                                </Row>
                                <hr />
            
                                <Row className={ classes.DetailsContentRow }>
                                    <Col lg={ 6 } md={ 5 } xs={ 12 } className={ classes.DetailsKey }>
                                        Date of Birth
                                    </Col>
                                    <Col lg={ 6 } md={ 8 } xs={ 12 } className={ classes.DetailsValue }>
                                        { user.dob }
                                    </Col>
                                </Row>
                                <hr />
                                <Row className={ classes.DetailsContentRow }>
                                    <Col lg={ 6 } md={ 5 } xs={ 12 } className={ classes.DetailsKey }>
                                        Joined on
                                    </Col>
                                    <Col lg={ 6 } md={ 8 } xs={ 12 } className={ classes.DetailsValue }>
                                        { user.createdOn }
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
            
                    <div className={ classes.Password }>
                        <h2 className={ classes.Subtitle }>Change Password</h2>
            
                        <form className={ classes.PasswordForm } onSubmit={ handleSubmit }>
                            <input
                                type="password"
                                name="currPass"
                                value={ form.currPass }
                                onChange={ handleChange }
                                placeholder="current password"
                            />
                            { validation.currPass && (
                                <span className="text-danger pb-3">
                                    {validation.currPass }
                                </span>
                            ) }
                            <input
                                type="password"
                                name="newPass"
                                value={ form.newPass }
                                onChange={ handleChange }
                                placeholder="new password"
                            />
                            { validation.newPass && (
                                <span className="text-danger pb-3">{ validation.newPass }</span>
                            ) }
                            <input
                                type="password"
                                name="confirmPass"
                                value={ form.confirmPass }
                                onChange={ handleChange }
                                placeholder="confirm password"
                            />
                            { validation.confirmPass && (
                                <span className="text-danger pb-3">
                                    {validation.confirmPass }
                                </span>
                            ) }
                            <button className={ classes.SubmitButton } type="submit">
                                CHANGE PASSWORD
                            </button>
                        </form>
                    </div>
                </div>
                <MovieRow
                    pathname=""
                    title="Recently Viewed"
                    movies={ history }
                    alternateMsg={ "YOU HAVEN'T LOOKED INTO ANY MOVIES YET" }
                />
                <Footer />
            </div>
        </>
    );
};
export default Profile;
