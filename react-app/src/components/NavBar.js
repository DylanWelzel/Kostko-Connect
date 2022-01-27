
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getSingleDepartmentThunk } from '../store/singleDepartment';
import LogoutButton from './auth/LogoutButton';
import navLogo from './images/navLogo.png'

const NavBar = () => {
  const { ticketId, departmentId } = useParams()
  const dispatch = useDispatch()

  const department = useSelector((state) => state.singleDepartment);
  const socket = useSelector((state) => state.socket);

  useEffect(() => {
    if (departmentId) {
      dispatch(getSingleDepartmentThunk(departmentId))
    }
  }, [])

  function clicked() {
    socket.emit("leaveroom", { ticketId })
    socket.disconnect()
    console.log('back button socket', socket)
  }

  return (
    <nav >
      <ul className='navContainer'>
        <li className='navDepartments'>
          <NavLink onClick={clicked} to='/departments' exact={true} activeClassName='active'>
            Home
          </NavLink>
          {ticketId &&
            <NavLink onClick={clicked} to={`/departments/${departmentId}/tickets`} exact={true} activeClassName='active'>
              Back To {department.name}
            </NavLink>
          }
        </li>
        <li>
          <img className="navLogo" src={navLogo} alt="logo" />
        </li>
        <li className='navLogout'>
          <NavLink onClick={clicked} className='socials' to={{ pathname: "https://linkedin.com/in/dylan-welzel-107140221" }} target="_blank" exact={true} activeClassName='active'>
            LinkedIn
          </NavLink>
          <NavLink onClick={clicked} className='socials' to={{ pathname: "https://github.com/dylanwelzel/Kostko-Connect" }} target="_blank" exact={true} activeClassName='active'>
            Github
          </NavLink>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
