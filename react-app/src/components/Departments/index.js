import "./departments.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { addDepartmentThunk, deleteDepartmentThunk, editDepartmentThunk, getDepartmentsThunk } from "../../store/departments";
import { getSingleDepartmentThunk } from "../../store/singleDepartment";
import SingleDepartment from "../SingleDepartment";
import { useState } from "react";
import Modal from "../AddDepartmentModal";
import EditDepartModal from "../EditDepartmentModal";

function Departments() {
    const dispatch = useDispatch();
    const departments = useSelector((state) => state.departments);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editId, setEditId] = useState(null);


    useEffect(() => {
        dispatch(getDepartmentsThunk())
    }, [dispatch])

    const departmentRead = () => {
        dispatch(getSingleDepartmentThunk(1))
    }

    console.log(editId)
    return (
        <>
            <div className="departmentList">
                {departments && departments.map(department => {
                    return (
                        <div className="singleDepartmentContainer" key={department.id} >
                            <SingleDepartment
                                id={department.id}
                                setIsEditOpen={setIsEditOpen}
                                name={department.name}
                                id={department.id}
                                setEditId={setEditId} />
                        </div>
                    )
                })}
            </div >
            <div className="addItHereContainer">
                <div className="addDepartmentContainer">Don't see your department? Add it here!</div>
                <button className='primaryBtn' onClick={() => setIsOpen(true)}>
                    Add Department
                </button>
            </div>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
            {isEditOpen && <EditDepartModal editId={editId} setIsOpen={setIsEditOpen} />}
        </>
    );

}

export default Departments;
