import { io } from 'socket.io-client'
const GET_SOCKET = "get/SOCKET"

export const getSocket = () => {
    return {
        type: GET_SOCKET
    }
}
//"https://kostcoconnect.herokuapp.com/"
//"http://localhost:5000/"
const endPoint = "https://kostcoconnect.herokuapp.com/";

const socket = (state = null, action) => {
    switch (action.type) {
        case GET_SOCKET:
            return io(`${endPoint}`);
        default:
            return state
    }
}

export default socket;
