import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editTicketThunk } from "../../store/tickets";

const SplashModal = ({ setIsOpen }) => {

    function close(e) {
        e.preventDefault()
        setIsOpen(false)
    }

    return (
        <>
            <div className='darkBG2' onClick={close} />
            <div className='centered'>
                <form className='ticketModal2'>
                    <div className='modalHeader'>
                        <h5 className='heading'>What is Kostco Connect?</h5>
                    </div>
                    <div className='modalContent'>
                        <p>
                            Kostco Connect is a web application inspired by my time working at a warehouse and seeing the need for an increase in productivity and communication.
                        </p>
                        <p>
                            On signup there are 3 roles you can select. Admins (Demo User) can create Departments, Stockers can add Tickets and Drivers can mark Tickets as complete.
                        </p>
                        <p>
                            Nested in each ticket is a live chat feature where a Driver and Stocker can communicate with one another about a certain ticket.
                        </p>
                        <p>
                            Play around and create your own Departments, add Tickets and write Messages! Enjoy the application!
                        </p>
                    </div>
                    <button
                        className='continueBtn'
                        onClick={close}
                    >
                        Continue
                    </button>
                </form >
            </div >
        </>
    );
};

export default SplashModal;
