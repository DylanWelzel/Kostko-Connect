import "./splash.css";
import { NavLink, Redirect } from 'react-router-dom';
import React from 'react';
import { useSelector } from "react-redux";
import logo3 from '../images/logo3.png'

function Splash() {

    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to='/departments' />;
    }

    return (
        <div>
            <img className="splashLogo" src={logo3} alt="logo" />
            <div className="splashContainer">
                {/* <div className="bannerContainer">
                <h1>Kostco Connect</h1>
            </div> */}
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
            </div>
        </div>
    );
}



export default Splash;
