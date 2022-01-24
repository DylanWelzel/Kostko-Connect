const GET_MESSAGES = "messages/GET_MESSAGES";
const ADD_MESSAGE = "messages/ADD_MESSAGE";

//Messages action
export const getMessages = (messages) => ({
    type: GET_MESSAGES,
    payload: messages,
});

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message,
});

export const getAllMessages = (ticketId) => async (dispatch) => {
    const res = await fetch(`/api/tickets/${ticketId}/messages`);

    if (res.ok) {
        const messages = await res.json();
        dispatch(getMessages(messages.messages));
        return messages;
    }
    return null;
}

export const createOneMessage = (ticketId, content) => async (dispatch) => {
    const res = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
    })
    if (res.ok) {
        const message = await res.json();
        // remove dispatch for websockets
        // dispatch(addMessage(message))
        return message
    }
    return null
}
const messages = (state = [], action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return action.payload
        case ADD_MESSAGE:
            return [action.payload, ...state]
        default:
            return state
    }
}

export default messages;
