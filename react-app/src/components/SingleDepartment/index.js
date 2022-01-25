import "./singledepartment.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { deleteDepartmentThunk, } from "../../store/departments";
import { useState } from "react";
import { useEffect } from "react";

function SingleDepartment({ id, name, setIsEditOpen, setEditId, tickets, setDeptName }) {
    const dispatch = useDispatch()
    const [isAdmin, setIsAdmin] = useState(false)

    const adminRole = useSelector((state) => state.session.user.role);

    useEffect(() => {
        if (adminRole === 'admin') {
            setIsAdmin(true)
        }
    }, [])

    const editTrigger = () => {
        setIsEditOpen(true)
        setEditId(id)
        setDeptName(name)
    }

    const removeDept = () => {
        dispatch(deleteDepartmentThunk(id))
    }


    return (
        <>
            <NavLink className='departmentDetails' to={`/departments/${id}/tickets`}>
                <h1>{name}</h1>
                <div className="activeTickets">Active tickets {tickets?.length || 0}</div>
            </NavLink>
            {isAdmin &&
                <div className="buttons">
                    <button className="removeButton" onClick={removeDept}>Remove</button>
                    <button
                        onClick={editTrigger}
                        className="editButton"
                    >Edit</button>
                </div>
            }
        </>
    );

}

export default SingleDepartment;
