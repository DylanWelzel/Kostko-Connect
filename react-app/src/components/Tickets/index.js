import "./tickets.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { deleteTicketThunk, editTicketThunk, postTicketThunk, readTicketsThunk } from "../../store/tickets";
import SingleTicket from "../SingleTicket";

function Tickets() {
    const dispatch = useDispatch();
    const { departmentId } = useParams()
    const tickets = useSelector((state) => state.tickets);

    useEffect(() => {
        dispatch(readTicketsThunk(departmentId))
    }, [dispatch])

    return (
        <div className="ticketsList">
            {tickets && tickets.map(ticket => {
                return (
                    <div className="singleTicketContainer" key={ticket.id} >
                        <SingleTicket
                            id={ticket.id}
                            itemName={ticket.item_name}
                            location={ticket.location}
                            description={ticket.description}
                            departmentId={ticket.department_id}
                        />
                    </div>
                )
            })}

        </div>
    );

}

export default Tickets;
