import {
  Map as ImmutableMap,
  fromJS,
} from 'immutable';

import types from '../../constants/actions';

export default (state = ImmutableMap(), action) => {
  switch (action.type) {
    case types.LOCATION_CHANGED:
      return state.set('coords', fromJS(action.payload));
    case types.CITY_ENTERED:
      return state.set('city', action.payload.city);
    default:
      return state;
  }
};
