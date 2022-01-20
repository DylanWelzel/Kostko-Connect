import "./singledepartment.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { addDepartmentThunk, deleteDepartmentThunk, editDepartmentThunk, getDepartmentsThunk } from "../../store/departments";
import { getSingleDepartmentThunk } from "../../store/singleDepartment";
import { readTicketsThunk } from "../../store/tickets";

function SingleDepartment({ id, name, setIsEditOpen, setEditId, tickets }) {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(readTicketsThunk(id))
    // }, [dispatch])


    const editTrigger = () => {
        setIsEditOpen(true)
        setEditId(id)
    }

    const removeDept = () => {
        dispatch(deleteDepartmentThunk(id))
    }
    return (
        <>
            <NavLink className='departmentDetails' to={`/departments/${id}/tickets`}>
                <h1>{name}</h1>
                <div className="activeTickets">Active tickets {tickets?.length}</div>
            </NavLink>
            <div className="buttons">
                <button className="removeButton" onClick={removeDept}>Remove</button>
                <button
                    onClick={editTrigger}
                    className="editButton"
                >Edit</button>
            </div>
        </>
    );

}

export default SingleDepartment;
