import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const emailErrors = errors?.filter(error => error.includes('email'))
  const passwordErrors = errors?.filter(error => error.includes('Password'))

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/departments' />;
  }

  return (
    <>
      <div className="bodyContent">
        <div className="signInTitle">
          <h2>Sign In</h2>
        </div>
        <form className='signInForm' onSubmit={onLogin}>
          {/* <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div> */}
          <div>
            <label htmlFor='email'>Email</label>
            <input
              required
              name='email'
              type='text'
              // placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
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
              name='password'
              type='password'
              // placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <div>
              {passwordErrors && passwordErrors.map((error, ind) => (
                <div className='errors' key={ind}>{error}</div>
              ))}
            </div>
            <button type='submit'>Login</button>
            <div className='switcher'>
              Just checking out the site?&nbsp;&nbsp;
            </div>
            <button onClick={demoLogin} type='submit'>Demo User</button>
            <div className='divider'></div>
            <div className='newToCostco'>New To Costco?</div>
            <NavLink to='/sign-up' className='createAccount'>Create Account</NavLink >
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
