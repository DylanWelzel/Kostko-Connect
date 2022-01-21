import "./ticketinfo.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { getSingleTicketThunk } from "../../store/singleTicket";
import { getSingleUserThunk } from "../../store/singleUser";
import { createOneMessage, getAllMessages } from "../../store/messages";


import e from "cors";

function TicketInfo() {
    const dispatch = useDispatch()
    const { ticketId } = useParams()
    const [messageContent, setMessageContent] = useState('')

    const ticket = useSelector((state) => state.singleTicket);
    const messages = useSelector((state) => state.messages);
    const user = useSelector(state => state.singleUser)
    const loggedInUsername = useSelector(state => state.session.user.username)

    useEffect(() => {
        dispatch(getSingleTicketThunk(ticketId))
    }, [])

    useEffect(() => {
        dispatch(getSingleUserThunk(ticket.owner_id))
    }, [ticket])

    useEffect(() => {
        dispatch(getAllMessages(ticketId))
    }, [dispatch])

    function postMessage(e) {
        e.preventDefault()
        dispatch(createOneMessage(ticketId, messageContent))
        return setMessageContent('')
    }


    return (
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
    );

}

export default TicketInfo;
