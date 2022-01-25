import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { login, signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [role, setRole] = React.useState('admin');

  const usernameErrors = errors?.filter(error => error.includes('Username'))
  const emailErrors = errors?.filter(error => error.includes('email'))
  const passwordErrors = errors?.filter(error => error.includes('Password'))

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setRole(e.target.value)
  }


  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, role));
      if (data) {
        return setErrors(data)
      }
    } else if (password !== repeatPassword) {
      return setErrors([
        "Passwords need to match!",
      ]);
    }
  };
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/departments' />;
  }

  return (
    <>
      <div className="bodyContent">
        <div className="signInTitle">
          <h2>Create Account</h2>
        </div>
        <form className='signInForm' onSubmit={onSignUp}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              required
              type='text'
              name='username'
              // placeholder='Username'
              onChange={updateUsername}
              value={username}
            ></input>
            <div>
              {usernameErrors && usernameErrors.map((error, ind) => (
                <div className='errors' key={ind}>{error}</div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              required
              type='text'
              name='email'
              // placeholder='Email'
              onChange={updateEmail}
              value={email}
            ></input>
            <div>
              {emailErrors && emailErrors.map((error, ind) => (
                <div className='errors' key={ind}>{error}</div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              required
              type='password'
              name='password'
              // placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
            <div>
              {passwordErrors && passwordErrors.map((error, ind) => (
                <div className='errors' key={ind}>{error}</div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor='repeat_password'>Confirm Password</label>
            <input
              required
              type='password'
              name='repeat_password'
              // placeholder='Confirm Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            ></input>
          </div>
          <p className='radioTitle'>Role</p>
          <div className='radios'>
            <div>
              <input type="radio"
                value="admin"
                checked={role === 'admin'}
                onChange={handleChange}
              /> Admin
            </div>
            <div>
              <input type="radio"
                value="stocker"
                checked={role === 'stocker'}
                onChange={handleChange}
              /> Stocker
            </div>
            <div>
              <input type="radio"
                value="driver"
                checked={role === 'driver'}
                onChange={handleChange}
              /> Driver
            </div>
          </div>
          <button type='submit'>Sign Up</button>
          <div className='switcher'>
            Just checking out the site?&nbsp;&nbsp;
          </div>
          <button onClick={demoLogin} type='submit'>Demo User</button>
          <div className='divider'></div>
          <div className='switcher'>
            Already have an account?&nbsp;&nbsp;
            <NavLink to='/login'>
              Sign In
            </NavLink>
          </div>
        </form>
      </div >
    </>
  );
};

export default SignUpForm;
