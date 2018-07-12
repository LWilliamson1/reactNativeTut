import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../config/router';

const router = AppNavigator.router;
const mainNavAction = router.getActionForPathAndParams('Home');
const initialNavState = router.getStateForAction(mainNavAction);

const NavReducer = (state = initialNavState, action) => {
  return router.getStateForAction(action, state) || state;
};

export default NavReducer;