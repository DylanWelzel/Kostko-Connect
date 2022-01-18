import "./tickets.css";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { postTicketThunk, readTicketsThunk } from "../../store/tickets";


function Tickets() {
    const hist = useHistory();
    const dispatch = useDispatch();
    const tickets = useSelector((state) => state.tickets);
    console.log(tickets)

    const ticketsRead = () => {
        dispatch(readTicketsThunk(1))
    }
    const ticketsCreate = () => {
        dispatch(postTicketThunk(1, 1, 'sugar', '132 a4', '3 layers'))
    }


    return (
        <div>
            <button onClick={ticketsRead}>ticketsRead</button>
            <button onClick={ticketsCreate}>ticketsCreate</button>
        </div>
    );

}

export default Tickets;
