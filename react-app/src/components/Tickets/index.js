import "./tickets.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { deleteTicketThunk, editTicketThunk, postTicketThunk, readTicketsThunk } from "../../store/tickets";
import SingleTicket from "../SingleTicket";
import AddTicketModal from "../AddTicketModal";

function Tickets() {
    const dispatch = useDispatch();
    const { departmentId } = useParams()
    const tickets = useSelector((state) => state.tickets);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(readTicketsThunk(departmentId))
    }, [dispatch])

    return (
        <>
            <div className="ticketList">
                {tickets && tickets.map(ticket => {
                    return (
                        <div className="singleTicketContainer" key={ticket.id} >
                            <SingleTicket
                                departmentId={departmentId}
                                ticketId={ticket.id}
                                itemName={ticket.item_name}
                                location={ticket.location}
                                description={ticket.description}
                                departmentId={ticket.department_id}
                            />
                        </div>
                    )
                })}
            </div>
            <div className="addItHereContainer">
                <button className='primaryBtn' onClick={() => setIsOpen(true)}>
                    Add a Ticket
                </button>
            </div>
            {isOpen && <AddTicketModal setIsOpen={setIsOpen} />}
            {/* {isEditOpen && <EditDepartModal editId={editId} setIsOpen={setIsEditOpen} />} */}
        </>
    );
}

export default Tickets;
