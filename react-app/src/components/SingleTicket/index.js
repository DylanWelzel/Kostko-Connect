import "./singleticket.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { deleteTicketThunk, isTicketDoneThunk } from "../../store/tickets";
import { getSocket } from "../../store/socket";
import { useState } from "react";

function SingleTicket({ departmentId, ticketId, itemName, location, description, setIsEditOpen, setEditId, ownerId, setPrevTicketName, setPrevTicketLocation, setPrevTicketDescription, setRoomId, isDone }) {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.session.user.id);
    const role = useSelector((state) => state.session.user.role);
    const [isDriver, setIsDriver] = useState(false)
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (role === 'driver') {
            setIsDriver(true)
        }
    }, [])

    // const socket = useSelector((state) => state.socket);

    const editTrigger = () => {
        setIsEditOpen(true)
        setPrevTicketName(itemName)
        setPrevTicketLocation(location)
        setPrevTicketDescription(description)
        setEditId(ticketId)
    }

    const removeTicket = () => {
        dispatch(deleteTicketThunk(ticketId))
    }

    async function setRoom(e) {
        e.preventDefault()
        await setRoomId(ticketId)
    }

    function setStyle(e) {
        e.preventDefault()
        dispatch(isTicketDoneThunk(ticketId))
    }
    if (isDone) {
        return (
            <div className="doneSingleTicketContainer" >
                <NavLink onClick={(e) => setRoom} className='ticketDetails' to={`/departments/${departmentId}/tickets/${ticketId}`}>
                    <h1>{itemName}</h1>
                    <div>{location}</div>
                    <div className="descriptionDiv">{description}</div>
                    {userId === ownerId &&
                        <div className="ticketButtons">
                            <button
                                onClick={
                                    async (e) => {
                                        e.preventDefault();
                                        editTrigger()
                                    }
                                }
                                className="editTicketButton"
                            >Edit</button>
                            <button className="removeTicketButton" onClick={
                                async (e) => {
                                    e.preventDefault();
                                    removeTicket()
                                }}>Remove</button>
                        </div>
                        || isDriver &&
                        <div className='completeContainer'>
                            <div>Complete</div>
                            <button onClick={(e) => setStyle(e)}>test</button>
                        </div>
                        || <div className="noButtons"></div>
                    }
                </NavLink >
            </div >
        );
    } else {
        return (
            <div className="singleTicketContainer" >
                <NavLink onClick={(e) => setRoom} className='ticketDetails' to={`/departments/${departmentId}/tickets/${ticketId}`}>
                    <h1>{itemName}</h1>
                    <div>{location}</div>
                    <div className="descriptionDiv">{description}</div>
                    {userId === ownerId &&
                        <div className="ticketButtons">
                            <button
                                onClick={
                                    async (e) => {
                                        e.preventDefault();
                                        editTrigger()
                                    }
                                }
                                className="editTicketButton"
                            >Edit</button>
                            <button className="removeTicketButton" onClick={
                                async (e) => {
                                    e.preventDefault();
                                    removeTicket()
                                }}>Remove</button>
                        </div>
                        || isDriver &&
                        <div className='completeContainer'>
                            <div>Complete</div>
                            <button onClick={(e) => setStyle(e)}>test</button>
                        </div>
                        || <div className="noButtons"></div>
                    }
                </NavLink >
            </div >
        );
    }

}

export default SingleTicket;
