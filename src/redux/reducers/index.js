import { combineReducers } from 'redux';

import user from './user';
import location from './location';
import session from './session';
import place from './place';

export default combineReducers({
  user,
  location,
  session,
  place,
});
