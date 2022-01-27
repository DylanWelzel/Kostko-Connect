import "./ticketinfo.css";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getSingleTicketThunk, isTicketDoneThunk, ticketNotDoneThunk } from "../../store/singleTicket";
import { getSingleUserThunk } from "../../store/singleUser";
import { addMessage, createOneMessage, getAllMessages } from "../../store/messages";
import { getSocket } from "../../store/socket";
import { getSingleDepartmentThunk } from "../../store/singleDepartment";


function TicketInfo() {
    const dispatch = useDispatch()
    const { ticketId, departmentId } = useParams()
    const [messageContent, setMessageContent] = useState('')
    const [leave, setLeave] = useState(false)

    const ticket = useSelector((state) => state.singleTicket);
    const messages = useSelector((state) => state.messages);
    const user = useSelector(state => state.singleUser)
    const loggedInUsername = useSelector(state => state.session.user.username)
    const session = useSelector((state) => state.session.user);
    const department = useSelector((state) => state.singleDepartment);
    const socket = useSelector((state) => state.socket);

    useEffect(() => {
        dispatch(getSocket())
    }, [])

    useEffect(() => {
        if (socket) {
            socket.emit("joinroom", { ticketId })
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on('message', (msg) => {
                const { allMessages } = msg
                dispatch(addMessage(allMessages))
            })
            return () => {
                socket.disconnect()
            }
        }
    }, [socket])

    useEffect(() => {
        dispatch(getSingleDepartmentThunk(departmentId))
    }, [])

    useEffect(() => {
        dispatch(getSingleTicketThunk(ticketId))
    }, [])

    useEffect(() => {
        if (ticket.owner_id) {
            dispatch(getSingleUserThunk(ticket.owner_id))
        }
    }, [ticket])

    useEffect(() => {
        dispatch(getAllMessages(ticketId))
    }, [dispatch])

    async function postMessage(e) {
        e.preventDefault()
        if (messageContent !== "") {
            const msg = await dispatch(createOneMessage(ticketId, messageContent));
            socket.emit("message", { ticketId, session, allMessages: msg });
            setMessageContent("");
        } else {
            alert("Please add message");
        }
    }


    if (leave) {
        return <Redirect to={`/departments/${department.id}/tickets`} />
    }

    return (
        <div>
            {/* <button onClick={back}>back to {department?.name}</button> */}
            <div className="pageContainer">
                <div className="ticketInfoContainer">
                    <h1 className="itemName">{ticket.item_name}</h1>
                    <h2 className="location">{ticket.location}</h2>
                    <div className="description">{ticket.description}</div>
                    <div className="userName">Created by {user.username}</div>
                </div>
                <div className="messagingContainer">
                    <div className="chatTitle">Chat</div>
                    <div className="chatLog">
                        <ul className="messagesContainer">
                            {messages && messages?.map(message => {
                                return (
                                    <div key={message.id} className="message">
                                        {loggedInUsername === message.owner.username &&
                                            <>
                                                <li className="messageContent">{message.content}</li>
                                                <li className="messageUser">{message?.owner?.username} </li>
                                            </>
                                        }
                                        {loggedInUsername !== message.owner.username &&
                                            <>
                                                <li className="otherMessageContent">{message.content}</li>
                                                <li className="otherMessageUser">{message?.owner?.username} </li>
                                            </>
                                        }
                                    </div>
                                )
                            })}
                        </ul>
                        <div className="messageDivider"></div>
                        <form onSubmit={postMessage}>
                            <input
                                className="chatInput"
                                type="text"
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                            />
                        </form>
                    </div>
                </div >
            </div >
        </div>

    );

}

export default TicketInfo;
