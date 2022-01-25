
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getSingleDepartmentThunk } from '../store/singleDepartment';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const { ticketId, departmentId } = useParams()
  const dispatch = useDispatch()

  const department = useSelector((state) => state.singleDepartment);
  const socket = useSelector((state) => state.socket);

  useEffect(() => {
    dispatch(getSingleDepartmentThunk(departmentId))
  }, [])

  function clicked() {
    if (socket) {
      socket.disconnect()
    }
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
        {/* <li className="navTitle">
          <h1>Kostco Connect</h1>
        </li> */}
        <img className="navLogo" src="./navLogo.png" alt="logo" />
        <li className='navLogout'>
          <NavLink onClick={clicked} to='/about' exact={true} activeClassName='active'>
            About Me!
          </NavLink>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
