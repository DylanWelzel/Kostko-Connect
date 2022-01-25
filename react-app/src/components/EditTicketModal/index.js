import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editTicketThunk } from "../../store/tickets";
import "./editticketmodal.css";

const EditTicketModal = ({ setIsOpen, editId, prevTicketLocation, prevTicketDescription, prevTicketName }) => {
    const [itemName, setItemName] = useState(prevTicketName)
    const [location, setLocation] = useState(prevTicketLocation)
    const [description, setDescription] = useState(prevTicketDescription)
    const [errors, setErrors] = useState([]);
    const { departmentId } = useParams()
    const dispatch = useDispatch()


    const editTicket = async (e) => {
        e.preventDefault()
        const data = await dispatch(editTicketThunk(itemName, location, description, editId))
        if (data.errors) {
            return setErrors(data.errors)
        }
        return setIsOpen(false)
    }
    return (
        <>
            <div className='darkBG' onClick={() => setIsOpen(false)} />
            <div className='centered'>
                <form onSubmit={editTicket} className='ticketModal'>
                    <div className='modalHeader'>
                        <h5 className='heading'>Change a Ticket</h5>
                    </div>
                    <div className='modalContent'>
                        Item Name
                    </div>
                    <input
                        required
                        className='modalInput'
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <div className='modalContent'>
                        Location
                    </div>
                    <input
                        required
                        className='modalInput'
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <div className='modalContent'>
                        Description
                    </div>
                    <input
                        required
                        className='modalInput'
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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

export default EditTicketModal;
