const ONE_TICKET = "tickets/ONE_TICKET";
const IS_DONE = 'tickets/IS_DONE'

export const getOneTicket = (ticket) => ({
    type: ONE_TICKET,
    payload: ticket,
});


// Get ONE ticket
export const getSingleTicketThunk = (ticketId) => async (dispatch) => {
    const res = await fetch(`/api/tickets/${ticketId}`);

    if (res.ok) {
        const body = await res.json();
        dispatch(getOneTicket(body));
        return body;
    } else {
        return null;
    }
};

export default function ticketReducer(state = [], action) {
    switch (action.type) {
        case ONE_TICKET:
            return action.payload;
        case IS_DONE:
            return action.payload;
        default:
            return state;
    }
}
