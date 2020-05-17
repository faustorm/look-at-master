import { Map as ImmutableMap } from 'immutable';
import { Alert } from 'react-native';

import types from '../../constants/actions';
import tabs from '../../constants/tabs';

export default (
  state = ImmutableMap({
    actualAuthTab: tabs.LOGIN_TAB,
    addingCard: false,
    actualNotification: ImmutableMap({
      analyzing: false,
      id: undefined,
    }),
  }),
  action,
) => {
  switch (action.type) {
    case types.CHANGE_AUTH_TAB:
      return state.set('actualAuthTab', action.payload);
    case types.SET_ACTUAL_NOTIFICATION:
      return state.set('actualNotification', ImmutableMap({ analyzing: true, id: action.payload.get('id') }));
    case types.CLOSE_NOTIFICATION:
      return state.set('actualNotification', ImmutableMap({ analyzing: false, id: undefined }));
    case types.CLOSE_MENU_OPEN_ADD_CARD:
      return state.set('addingCard', true);
    case types.CLOSE_ADDRESS_MENU_OPEN_ADD:
      const newState = state.set('analyzingAddress', false);
      return newState.set('addingAddress', true);
    case types.CLOSE_ADD_ADDRESS:
      return state.set('addingAddress', false);
    case types.INSPECT_ADDRESSES:
      return state.set('analyzingAddress', true);
    case types.CLOSE_ADDRESS_MANAGER:
      return state.set('analyzingAddress', false);
    case types.OPEN_ADD_CARD:
      return state.set('addingCard', true);
    case types.CLOSE_ADD_CARD:
      return state.set('addingCard', false);
    case types.OPEN_REVIEW_MODAL:
      return state.set('addingReview', true);
    case types.CLOSE_REVIEW_MODAL:
      return state.set('addingReview', false);
    case types.CLOSE_ADD_RESERVATION:
      return state.set('addingReservation', false);
    case types.SET_ACTUAL_SCHEDULE_DAY:
      return state.set('actualScheduleDay', action.payload);
    case types.OPEN_ADD_RESERVATION:
      return state.set('addingReservation', true);
    default:
      return state;
  }
};
