import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TopBar from "../../components/top-bar/TopBar";
import classes from "./Profile.module.css";
import posterImage from "../../assets/Images/mk.jpg";
import Footer from "../../components/footer/Footer";
import { Container, Row, Col } from "react-bootstrap";

const Profile = () => {
    const history = useHistory();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const { username } = JSON.parse(userData);

            fetch(`http://127.0.0.1:8000/accounts/profile/${username}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Profile not found');
                    }
                    return response.json();
                })
                .then(data => {
                    setUserDetails(data);
                })
                .catch(error => {
                    console.error("Error fetching profile:", error);
                    history.push('/');
                });
        } else {
            history.push('/signin');
        }
    }, [history]);

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <TopBar title="Profile" />
            <div className={classes.ProfileContent}>
                <div className={classes.ProfilePic}>
                    <img src={posterImage} alt="Profile" />
                </div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <h2 className={classes.Subtitle}>Your Details</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className={classes.DetailsKey}>
                            Username
                        </Col>
                        <Col md={6} className={classes.DetailsValue}>
                            {userDetails.username}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className={classes.DetailsKey}>
                            Email
                        </Col>
                        <Col md={6} className={classes.DetailsValue}>
                            {userDetails.email}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className={classes.DetailsKey}>
                            Date of Birth
                        </Col>
                        <Col md={6} className={classes.DetailsValue}>
                            {userDetails.dob}
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
