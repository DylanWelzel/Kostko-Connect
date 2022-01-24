import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editDepartmentThunk } from "../../store/departments";

const EditDepartModal = ({ setIsOpen, editId, deptName }) => {
    const [departmentName, setDepartmentName] = useState(deptName)
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()

    const editDept = async (e) => {
        e.preventDefault()
        const data = await dispatch(editDepartmentThunk(departmentName, editId))
        if (data.errors) {
            return setErrors(data.errors)
        }
        return setIsOpen(false)
    }
    return (
        <>
            <div className='darkBG' onClick={() => setIsOpen(false)} />
            <div className='centered'>
                <form onSubmit={editDept} className='modal'>
                    <div className='modalHeader'>
                        <h5 className='heading'>Edit a department</h5>
                    </div>
                    <div className='modalContent'>
                        Department Name
                    </div>
                    <input
                        required
                        className='modalInput'
                        type="text"
                        value={departmentName}
                        placeholder="Bakery"
                        onChange={(e) => setDepartmentName(e.target.value)}
                    />
                    {errors && errors.map((error, ind) => (
                        <div className='modalErrors' key={ind}>{error}</div>
                    ))}
                    <div className='modalActions'>
                        <div className='actionsContainer'>
                            <button
                                type="submit"
                                className='deleteBtn'
                            >
                                Update
                            </button>
                            <button
                                className='cancelBtn'
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </>
    );
};

export default EditDepartModal;
