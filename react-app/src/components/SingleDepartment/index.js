import "./singledepartment.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from "react";
import { deleteDepartmentThunk, } from "../../store/departments";

function SingleDepartment({ id, name, setIsEditOpen, setEditId, tickets }) {
    const dispatch = useDispatch()
    // const socket = useSelector((state) => state.socket)

    // useEffect(() => {
    //     dispatch(getSocket());
    // })

    const editTrigger = () => {
        setIsEditOpen(true)
        setEditId(id)
    }

    const removeDept = () => {
        dispatch(deleteDepartmentThunk(id))
    }

    // function joinServer() {
    //     socket.emit("joinserver", { department: id })
    // }

    return (
        <>
            <NavLink className='departmentDetails' to={`/departments/${id}/tickets`}>
                <h1>{name}</h1>
                <div className="activeTickets">Active tickets {tickets?.length || 0}</div>
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
