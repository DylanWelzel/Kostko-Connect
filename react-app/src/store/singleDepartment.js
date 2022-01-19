const ONE_DEPARTMENT = "departments/ONE_DEPARTMENT";

//Organization actions
export const getOneDepartment = (department) => ({
    type: ONE_DEPARTMENT,
    payload: department,
});

// Get ONE department
export const getSingleDepartmentThunk = (departmentId) => async (dispatch) => {
    const res = await fetch(`/api/departments/${departmentId}`);

    if (res.ok) {
        const body = await res.json();
        dispatch(getOneDepartment(body));
        return body;
    } else {
        return null;
    }
};

export default function departmentReducer(state = [], action) {
    switch (action.type) {
        case ONE_DEPARTMENT:
            return action.payload;
        default:
            return state;
    }
}
