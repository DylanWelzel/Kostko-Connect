import "./singleticket.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { deleteTicketThunk } from "../../store/tickets";
import { getSocket } from "../../store/socket";

function SingleTicket({ departmentId, ticketId, itemName, location, description, setIsEditOpen, setEditId, ownerId }) {
    const dispatch = useDispatch()

    const userId = useSelector((state) => state.session.user.id);

    const socket = useSelector((state) => state.socket);

    const editTrigger = () => {
        setIsEditOpen(true)
        setEditId(ticketId)
    }

    const removeTicket = () => {
        dispatch(deleteTicketThunk(ticketId))
    }

    useEffect(() => {
        dispatch(getSocket());
    }, [])

    function joinRoom() {
        if (!socket) {
            dispatch(getSocket());
        }
        if (socket) {
            socket.emit("joinroom", { ticketId })
            console.log(`joining room ${ticketId}`)
            socket.emit("joinserver", { department: departmentId })
            return () => {
                socket.disconnect();
            };
        }
    }

    return (
        <>
            <NavLink onClick={joinRoom} className='ticketDetails' to={`/departments/${departmentId}/tickets/${ticketId}`}>
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
                    || <div className="noButtons"></div>}
            </NavLink>
        </>
    );

}

export default SingleTicket;
