import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postTicketThunk } from "../../store/tickets";
import "./addticketmodal.css";

const AddTicketModal = ({ setIsOpen }) => {
    const [itemName, setItemName] = useState('')
    const [location, setLocation] = useState('122 A1')
    const [description, setDescription] = useState('10 pounds')
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
    console.log(description, location)

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
                        placeholder="Sugar"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <div className='modalContent'>
                        Location
                    </div>
                    <div className="select-wrapper">
                        <select
                            className='selectModalInput'
                            defaultValue={location}
                            onChange={(e) => setLocation(e.target.value)}>
                            <option value="122 A1">122 A1</option>
                            <option value="122 B1">122 B1</option>
                            <option value="122 C1">122 C1</option>
                            <option value="122 D1">122 D1</option>
                            <option value="122 D1">122 D1</option>
                        </select>
                    </div>
                    {/* <input
                        required
                        className='modalInput'
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    /> */}
                    <div className='modalContent'>
                        Description
                    </div>
                    <div className="select-wrapper">
                        <select
                            className='selectModalInput'
                            defaultValue={description}
                            onChange={(e) => setDescription(e.target.value)}>
                            <option value="10 pounds">10 pounds</option>
                            <option value="10 gallons">10 gallons</option>
                            <option value="10 boxes">10 boxes</option>
                            <option value="10 bottles">10 bottles</option>
                            <option value="Whole pallet">Whole pallet</option>
                        </select>
                    </div>
                    {/* <input
                        required
                        className='modalInput'
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    /> */}
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
