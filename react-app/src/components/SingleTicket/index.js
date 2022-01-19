import "./singleticket.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { getSingleDepartmentThunk } from "../../store/singleDepartment";
import { deleteTicketThunk } from "../../store/tickets";

function SingleTicket({ departmentId, ticketId, itemName, location, description, setIsEditOpen, setEditId }) {
    const dispatch = useDispatch()

    const editTrigger = () => {
        setIsEditOpen(true)
        setEditId(ticketId)
    }

    const removeTicket = () => {
        dispatch(deleteTicketThunk(ticketId))
    }

    return (
        <>
            <NavLink className='ticketDetails' to={`/departments/${departmentId}/tickets/${ticketId}`}>
                <h1>{itemName}</h1>
                <div>{location}</div>
                <div>{description}</div>
            </NavLink>
            <div className="ticketButtons">
                <button
                    onClick={editTrigger}
                    className="editButton"
                >Edit</button>
                <button className="removeButton" onClick={removeTicket}>Remove</button>
            </div>
        </>
    );

}

export default SingleTicket;
