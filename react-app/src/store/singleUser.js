const ONE_USER = "users/ONE_USER";

//Organization actions
export const getOneUser = (user) => ({
    type: ONE_USER,
    payload: user,
});

// Get ONE user
export const getSingleUserThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);

    if (res.ok) {
        const body = await res.json();
        dispatch(getOneUser(body));
        return body;
    } else {
        return null;
    }
};

export default function userReducer(state = [], action) {
    switch (action.type) {
        case ONE_USER:
            return action.payload;
        default:
            return state;
    }
}
