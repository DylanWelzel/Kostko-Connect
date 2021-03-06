const GET_DEPARTMENTS = "departments/GET_DEPARTMENTS";
const ADD_DEPARTMENT = "departments/ADD_DEPARTMENT";
const EDIT_DEPARTMENT = "departments/EDIT_DEPARTMENT";
const DELETE_DEPARTMENT = "departments/DELETE_DEPARTMENT";

//department actions

export const getDepartments = (departments) => {
    return {
        type: GET_DEPARTMENTS,
        payload: departments,
    };
};

export const addDepartment = (department) => ({
    type: ADD_DEPARTMENT,
    payload: department,
});

export const editDepartment = (departmentInfo) => ({
    type: EDIT_DEPARTMENT,
    payload: departmentInfo,
});

const deleteDepartment = (department) => {
    return {
        type: DELETE_DEPARTMENT,
        payload: department,
    };
};


//Department Thunks

//Get Departments
export const getDepartmentsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/departments/`);

    if (res.ok) {
        const body = await res.json();
        dispatch(getDepartments(body.departments));
        return body;
    } else {
        return null;
    }
};
//Add Department
export const addDepartmentThunk = (name) => async (dispatch) => {
    const response = await fetch(`/api/departments/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (data.errors) return data
    dispatch(addDepartment(data));
    return data;
};

//Edit Department
export const editDepartmentThunk = (name, id) => async (dispatch) => {
    const response = await fetch(`/api/departments/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (data.errors) return data
    dispatch(editDepartment(data));
    return data;
};

//Delete Department
export const deleteDepartmentThunk = (departmentId) => async (dispatch) => {
    const res = await fetch(`/api/departments/${departmentId}/delete`, {
        method: "DELETE",
    });

    if (res.ok) {
        const department = await res.json();
        dispatch(deleteDepartment(department));
        return;
    } else {
        return null;
    }
};


export default function departmentsReducer(state = [], action) {
    switch (action.type) {
        case GET_DEPARTMENTS:
            return action.payload;
        case ADD_DEPARTMENT:
            return [...state, action.payload];
        case DELETE_DEPARTMENT:
            return state.filter((department) => department.id !== action.payload.id);
        case EDIT_DEPARTMENT:
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
