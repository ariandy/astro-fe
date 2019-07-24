import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from '../../navigations/RootNavigation';
import register from './register'
import question from './question'
import answer from './answer'

const router = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router,
  register,
  question,
  answer
});

export default appReducer;