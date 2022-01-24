
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import socket from '../store/socket';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {

  const { ticketId, departmentId } = useParams()

  console.log(ticketId, departmentId, 'hiiiiii')

  function test() {
    if (ticketId) {
      socket.emit('leaveroom', { ticketId })
      console.log(`leaving room ${ticketId}`)
    }
    if (departmentId) {
      socket.emit('leaveserver', { department: departmentId })
      console.log(`leaving department ${departmentId}`)
    }
  }

  return (
    <nav >
      <ul className='navContainer'>
        <li className='navDepartments'>
          <NavLink onClick={test} to='/departments' exact={true} activeClassName='active'>
            Home
          </NavLink>
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
