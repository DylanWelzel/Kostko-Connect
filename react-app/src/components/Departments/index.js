import "./departments.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { addDepartmentThunk, deleteDepartmentThunk, editDepartmentThunk, getDepartmentsThunk } from "../../store/departments";
import { getSingleDepartmentThunk } from "../../store/singleDepartment";

function Departments() {
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
    const departmentEdit = () => {
        dispatch(editDepartmentThunk('Newest edit', 1))
    }
    const departmentAdd = () => {
        dispatch(addDepartmentThunk('Meat'))
    }
    const departmentDelete = () => {
        dispatch(deleteDepartmentThunk(5))
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
            <button onClick={departmentEdit}>departmentEdit</button>
            <button onClick={departmentAdd}>departmentAdd</button>
            <button onClick={departmentDelete}>departmentDelete</button>

        </div>
    );

}

export default Departments;
