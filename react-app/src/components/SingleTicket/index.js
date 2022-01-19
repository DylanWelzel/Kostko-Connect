import "./singleticket.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { getSingleDepartmentThunk } from "../../store/singleDepartment";

function SingleTicket({ departmentId, ticketId, itemName, location, description }) {
    const dispatch = useDispatch()


    return (

        <NavLink className='ticketDetails' to={`/departments/${departmentId}/tickets/${ticketId}`}>
            <h1>{itemName}</h1>
            <div>{location}</div>
            <div>{description}</div>
        </NavLink>

    );

}

export default SingleTicket;
