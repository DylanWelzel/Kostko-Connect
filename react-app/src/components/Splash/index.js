import "./splash.css";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from 'react';
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";

function Splash() {
    const hist = useHistory();
    const dispatch = useDispatch();

    return (
        <>
            <div className="bannerContainer">
                <h1>Costco Connect</h1>
            </div>
            <div className="formContainer">
                <div className="loginContainer">
                    <h2>Login</h2>
                </div>
                <div className="loginContainer">
                    <h2>Sign Up</h2>
                </div>
            </div>
        </>
    );
}



export default Splash;
