import "./tickets.css";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { deleteTicketThunk, editTicketThunk, postTicketThunk, readTicketsThunk } from "../../store/tickets";
import { getDepartmentsThunk, getSingleDepartmentThunk } from "../../store/departments";


function Tickets() {
    const hist = useHistory();
    const dispatch = useDispatch();
    const tickets = useSelector((state) => state.tickets);

    // const ticketsRead = () => {
    //     dispatch(readTicketsThunk(1))
    // }
    // const ticketsCreate = () => {
    //     dispatch(postTicketThunk(1, 1, 'sugar', '132 a4', '3 layers'))
    // }
    // const ticketsDelete = () => {
    //     dispatch(deleteTicketThunk(15))
    // }
    // const ticketsEdit = () => {
    //     dispatch(editTicketThunk('edit Sugar', '133 a5', 'this is an edit', 7))
    // }
    const departmentsRead = () => {
        dispatch(getDepartmentsThunk())
    }
    const departmentRead = () => {
        dispatch(getSingleDepartmentThunk(1))
    }
    return (
        <div>
            {/* <button onClick={ticketsRead}>ticketsRead</button> */}
            {/*
            <button onClick={ticketsCreate}>ticketsCreate</button>
            <button onClick={ticketsDelete}>ticketsDelete</button>
            <button onClick={ticketsEdit}>ticketsEdit</button> */}
            <button onClick={departmentsRead}>departmentsRead</button>
            <button onClick={departmentRead}>departmentSINGLERead</button>
        </div>
    );

}

export default Tickets;
