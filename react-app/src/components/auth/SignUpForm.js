import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
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
      <div className="bannerContainer">
        <h1>Costco Connect</h1>
      </div>
      <div className="bodyContent">
        <div className="signInTitle">
          <h2>Sign In</h2>
        </div>
        <form className='signInForm' onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              // placeholder='Username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              // placeholder='Email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              // placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label htmlFor='repeat_password'>Confirm Password</label>
            <input
              type='password'
              name='repeat_password'
              // placeholder='Confirm Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit'>Sign Up</button>
          <div className='divider'></div>
          <div className='switcher'>
            Already have an account?&nbsp;&nbsp;
            <NavLink to='/login'>
              Sign In
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
