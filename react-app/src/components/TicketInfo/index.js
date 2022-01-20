import "./ticketinfo.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { getSingleTicketThunk } from "../../store/singleTicket";
import { getSingleUserThunk } from "../../store/singleUser";

function TicketInfo() {
    const dispatch = useDispatch()
    const { ticketId } = useParams()

    const ticket = useSelector((state) => state.singleTicket);
    const user = useSelector(state => state.singleUser)

    useEffect(() => {
        dispatch(getSingleTicketThunk(ticketId))
    }, [])

    useEffect(() => {
        dispatch(getSingleUserThunk(ticket.owner_id))
    }, [ticket])

    return (
        <div className="pageContainer">
            <div className="ticketInfoContainer">
                <h1 className="itemName">{ticket.item_name}</h1>
                <h2 className="location">{ticket.location}</h2>
                <div className="description">{ticket.description}</div>
                <div className="userName">Created by {user.username}</div>
            </div>
            <div className="messagingContainer">
                MESSAGING
            </div>
        </div>
    );

}

export default TicketInfo;
