import "./ticketinfo.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { getSingleDepartmentThunk } from "../../store/singleDepartment";

function TicketInfo() {
    const dispatch = useDispatch()


    return (
        <h1>TICKET INFO</h1>
    );

}

export default TicketInfo;
