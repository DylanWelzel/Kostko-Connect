import "./splash.css";
import { NavLink, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import logo3 from '../images/logo3.png'
import SplashModal from "../SplashModal";

function Splash() {

    const user = useSelector(state => state.session.user);
    const [isOpen, setIsOpen] = useState(true)

    if (user) {
        return <Redirect to='/departments' />;
    }

    return (
        <>
            <div>
                <img className="splashLogo" src={logo3} alt="logo" />
                <div className="splashContainer">
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
            {isOpen &&
                <div className="about">
                    <SplashModal setIsOpen={setIsOpen} />
                </div>
            }
            <div className="test">
                <NavLink
                    to={{
                        pathname: "https://linkedin.com/in/dylan-welzel-107140221"
                    }}
                    target="_blank"
                >
                    <h2>LinkedIn</h2>
                </NavLink>
                <div className="createdby">
                    Created by Dylan Welzel
                </div>
                <NavLink
                    to={{
                        pathname: "https://github.com/DylanWelzel/Kostko-Connect"
                    }}
                    target="_blank"
                >
                    <h2>GitHub</h2>
                </NavLink>
            </div>
        </>
    );
}



export default Splash;
