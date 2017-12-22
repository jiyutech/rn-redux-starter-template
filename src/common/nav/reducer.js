import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../../AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const LoginScreen = AppNavigator.router.getActionForPathAndParams('Login');
let initialNavState = AppNavigator.router.getStateForAction(
  NavigationActions.init()
);

// state = initialNavState
function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'LOG_IN_SUCCEED':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'LOG_OUT':
      nextState = AppNavigator.router.getStateForAction(
        LoginScreen,
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default nav;
