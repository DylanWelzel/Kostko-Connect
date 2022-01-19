import "./singleticket.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { getSingleDepartmentThunk } from "../../store/singleDepartment";

function SingleTicket({ id, itemName, location, description, departmentId }) {
    const dispatch = useDispatch()


    return (
        <>
            <div>
                id {id},
                itemName {itemName},
                location {location},
                description {description},
                departmentId {departmentId}
            </div>
        </>
    );

}

export default SingleTicket;
