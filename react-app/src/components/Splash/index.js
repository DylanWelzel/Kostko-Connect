import "./splash.css";
import { NavLink, Redirect } from 'react-router-dom';
import React from 'react';
import { useSelector } from "react-redux";

function Splash() {

    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to='/departments' />;
    }

    const login = () => {
        return <NavLink to='/login' />;
    }

    const signup = () => {
        return <Redirect to='/sign-up' />;
    }
    return (
        <>
            <div className="bannerContainer">
                <h1>Costco Connect</h1>
            </div>
            <div className="formContainer">
                <NavLink
                    to='/login'
                    className="loginContainer"
                >
                    <h2>Login</h2>
                </NavLink>
                <NavLink
                    to='/sign-up'
                    className="loginContainer"
                >
                    <h2>Sign Up</h2>
                </NavLink>
            </div>
        </>
    );
}



export default Splash;
