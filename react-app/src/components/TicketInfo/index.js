import "./ticketinfo.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { getSingleTicketThunk } from "../../store/singleTicket";

function TicketInfo() {
    const dispatch = useDispatch()
    const { ticketId } = useParams()

    const ticket = useSelector((state) => state.singleTicket);


    useEffect(() => {
        dispatch(getSingleTicketThunk(ticketId))
    }, [])

    return (
        <h1>{ticket.item_name}</h1>
    );

}

export default TicketInfo;
