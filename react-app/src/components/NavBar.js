
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <nav >
      <ul className='navContainer'>
        <li className='navDepartments'>
          <NavLink to='/departments' exact={true} activeClassName='active'>
            Departments
          </NavLink>
        </li>
        <li className='navLogout'>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
