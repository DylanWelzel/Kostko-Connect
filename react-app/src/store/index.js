import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import tickets from './tickets'
import departments from './departments'
import singleDepartment from './singleDepartment'
import singleTicket from './singleTicket';
import singleUser from './singleUser'
import socket from './socket'
import messages from './messages'

const rootReducer = combineReducers({
  session,
  tickets,
  departments,
  singleDepartment,
  singleTicket,
  singleUser,
  socket,
  messages
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
