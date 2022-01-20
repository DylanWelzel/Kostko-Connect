import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postTicketThunk } from "../../store/tickets";
import "./addticketmodal.css";

const AddTicketModal = ({ setIsOpen }) => {
    const [itemName, setItemName] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([]);
    const { departmentId } = useParams()
    const userId = useSelector((state) => state.session.user.id);
    const dispatch = useDispatch()


    const createTicket = async (e) => {
        e.preventDefault()
        const data = await dispatch(postTicketThunk(userId, departmentId, itemName, location, description))
        if (data.errors) {
            return setErrors(data.errors)
        }
        return setIsOpen(false)
    }

    return (
        <>
            <div className='darkBG' onClick={() => setIsOpen(false)} />
            <div className='centered'>
                <form onSubmit={createTicket} className='ticketModal'>
                    <div className='modalHeader'>
                        <h5 className='heading'>Add a Ticket</h5>
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
                                Add
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

export default AddTicketModal;
