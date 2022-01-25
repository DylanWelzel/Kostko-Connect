
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const { ticketId, departmentId } = useParams()
  const socket = useSelector((state) => state.socket);

  function clicked() {
    if (socket) {
      socket.disconnect()
      console.log('disconnected')
    }
  }

  return (
    <nav >
      <ul className='navContainer'>
        <li className='navDepartments'>
          <NavLink onClick={clicked} to='/departments' exact={true} activeClassName='active'>
            Home
          </NavLink>
          {/* {toDept &&
            <NavLink onClick={clicked} to={`/departments/${departmentId}`} exact={true} activeClassName='active'>
              Home
            </NavLink>
          } */}
        </li>
        <li className="navTitle">
          <h1>Kostco Connect</h1>
        </li>
        <li className='navLogout'>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
