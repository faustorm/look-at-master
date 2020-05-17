import {
  Map as ImmutableMap,
  fromJS,
} from 'immutable';

import types from '../../constants/actions';

export default (state = ImmutableMap(), action) => {
  switch (action.type) {
    case types.RECEIVE_USER:
      return fromJS(action.payload);
    case types.USER_LOGOUT:
      return ImmutableMap();
    case types.RECEIVE_NOTIFICATIONS:
      return state.set('notifications', ImmutableMap().withMutations((innerMap) => {
        Object.keys(action.payload).forEach((key) => {
          const value = action.payload[key];
          innerMap.set(action.payload[key].id, fromJS(value));
        });
      }));
    case types.INSPECT_CREDIT_CARDS:
      return state.setIn(['cards', 'analyzing'], true);
    case types.CLOSE_MENU_OPEN_ADD_CARD:
      return state.setIn(['cards', 'analyzing'], false);
    case types.CLOSE_CREDIT_CARDS:
      return state.setIn(['cards', 'analyzing'], false);
    case types.RECEIVE_USER_CARDS:
      return state.setIn(['cards', 'data'], ImmutableMap().withMutations((innerMap) => {
        Object.keys(action.payload).forEach((key) => {
          const value = action.payload[key];
          innerMap.set(action.payload[key].id, fromJS(value));
        });
      }));
    case types.RECEIVE_USER_ADDRESS:
      return state.setIn(['address', 'data'], ImmutableMap().withMutations((innerMap) => {
        Object.keys(action.payload).forEach((key) => {
          const value = action.payload[key];
          innerMap.set(action.payload[key].id, fromJS(value));
        });
      }));
    case types.DELETE_CARD:
      return state.deleteIn(['cards', 'data', action.payload.get('id')]);
    case types.DELETE_ADDRESS:
      return state.deleteIn(['address', 'data', action.payload.get('id')]);
    case types.RECEIVE_ORDER_INFO:
      return state.setIn(['notifications', action.payload.id, 'order'], fromJS(action.payload.data));
    case types.RECEIVE_PRODUCT_ORDER_INFO:
      return state.setIn(['notifications', action.payload.id, 'order', 'products'], fromJS(action.payload.data));
    case types.RECEIVE_ORDER_ADDRESS:
      return state.setIn(['notifications', action.payload.id, 'order', 'Address'], fromJS(action.payload.data));
    case types.RECEIVE_RESERVATION_INFO:
      return state.setIn(['notifications', action.payload.id, 'reservation'], fromJS(action.payload.data));
    case types.RECEIVE_RESERVATION_ADDRESS:
      return state.setIn(['notifications', action.payload.id, 'reservation', 'address'], fromJS(action.payload.data));
    default:
      return state;
  }
};
