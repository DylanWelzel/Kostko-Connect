import io from 'socket.io'
const GET_SOCKET = "get/SOCKET"

export const getSocket = () => {
    return {
        type: GET_SOCKET
    }
}
// must use http here
//"https://zing-app.herokuapp.com" for heroku
//"http://http://localhost:5000/"
const endPoint = "http://http://localhost:5000/";

const socket = (state = null, action) => {
    switch (action.type) {
        case GET_SOCKET:
            return io(`${endPoint}`, {
                reconnectionDelayMax: 10000
            });
        default:
            return state
    }
}

export default socket;