import "./departments.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getDepartmentsThunk } from "../../store/departments";
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
    const [deptName, setDeptName] = useState('')



    useEffect(() => {
        dispatch(getDepartmentsThunk())
    }, [dispatch])

    return (
        <>
            <div className="departmentList">
                {departments && departments.map(department => {
                    return (
                        <div className="singleDepartmentContainer" key={department.id} >
                            <SingleDepartment
                                setIsEditOpen={setIsEditOpen}
                                name={department.name}
                                id={department.id}
                                setEditId={setEditId}
                                tickets={department.tickets}
                                setDeptName={setDeptName}
                            />
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
            {isOpen && <Modal setIsOpen={setIsOpen} deptName={deptName} />}
            {isEditOpen && <EditDepartModal editId={editId} setIsOpen={setIsEditOpen} deptName={deptName} />}
        </>
    );

}

export default Departments;
