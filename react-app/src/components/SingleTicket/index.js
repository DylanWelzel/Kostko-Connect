import "./singleticket.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { getSingleDepartmentThunk } from "../../store/singleDepartment";
import { deleteTicketThunk } from "../../store/tickets";

function SingleTicket({ departmentId, ticketId, itemName, location, description, setIsEditOpen, setEditId, ownerId }) {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.session.user.id);
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
            {userId === ownerId &&
                <div className="ticketButtons">
                    <button
                        onClick={editTrigger}
                        className="editButton"
                    >Edit</button>
                    <button className="removeButton" onClick={removeTicket}>Remove</button>
                </div>
                || <div className="noButtons"></div>}
        </>
    );

}

export default SingleTicket;
