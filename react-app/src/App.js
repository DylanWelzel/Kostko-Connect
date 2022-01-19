import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Tickets from './components/Tickets';
import Departments from './components/Departments';
import Splash from './components/Splash';
import LoginForm from './components/auth/LoginForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <ProtectedRoute > */}
      <NavBar />
      {/* </ProtectedRoute> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Splash />
        </Route>
        <ProtectedRoute path='/departments' exact={true} >
          <Departments />
        </ProtectedRoute>
        <ProtectedRoute path='/departments/:departmentId/tickets' exact={true} >
          <Tickets />
        </ProtectedRoute>
        {/*
        <ProtectedRoute path='/departments/:departmentId/tickets/:ticketId' exact={true} >
          <Tickets />
        </ProtectedRoute> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
