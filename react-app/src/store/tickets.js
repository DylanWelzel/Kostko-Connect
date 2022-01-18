const GET_TICKETS = "tickets/GET_TICKETS";
const ADD_TICKET = "tickets/ADD_TICKET";
const EDIT_TICKET = "tickets/EDIT_TICKET";
const DELETE_TICKET = "tickets/DELETE_TICKET";

export const getTickets = (tickets, departmentId) => ({
    type: GET_TICKETS,
    payload: tickets,
    departmentId,
});

export const addTicket = (ticketInfo) => ({
    type: ADD_TICKET,
    payload: ticketInfo,
});

export const editTicket = (ticketInfo, ticketId) => ({
    type: EDIT_TICKET,
    payload: ticketInfo,
    ticketId
})

export const deleteTicket = (ticketId) => ({
    type: DELETE_TICKET,
    payload: ticketId
});

// Get tickets
export const readTicketsThunk = (departmentId) => async (dispatch) => {
    const res = await fetch(`/api/departments/${departmentId}/tickets`);
    if (res.ok) {
        const tickets = await res.json();
        dispatch(getTickets(tickets.tickets, departmentId));
        return tickets;
    } else {
        return null;
    }
};

//Add ticket
export const postTicketThunk = (userId, departmentId, item_name, location, description) => async (dispatch) => {
    const response = await fetch(`/api/departments/${departmentId}/user/${userId}/tickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_name, location, description }),
    });
    const data = await response.json();
    dispatch(addTicket(data))
    return data;
};

//Edit ticket
export const editTicketThunk = (ticketInfo, ticketId) => async (dispatch) => {
    const res = await fetch(`/api/tickets/${ticketId}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketInfo }),
    })
    if (res.ok) {
        const ticket = await res.json()
        dispatch(editTicket(ticket, ticketId))
    }
}


//Delete ticket
export const removeTicket = (ticketId) => async (dispatch) => {
    const res = await fetch(`/api/tickets/${ticketId}/delete`, {
        method: "DELETE",
    });

    if (res.ok) {
        const ticket = await res.json();
        dispatch(deleteTicket(ticket));
        return;
    } else {
        return null;
    }
};

export default function ticketReducer(state = [], action) {

    switch (action.type) {
        case GET_TICKETS:
            return action.payload;
        case DELETE_TICKET:
            return state.filter((ticket) => ticket.id !== action.payload.id);
        case ADD_TICKET:
            return [...state, action.payload];
        case EDIT_TICKET:
            return state.map((e) => {
                if (e.id === action.payload.id) {
                    return action.payload;
                }
                return e;
            })
        default:
            return state;
    }
}
