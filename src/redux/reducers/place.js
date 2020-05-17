import { Map as ImmutableMap, fromJS } from 'immutable';

import types from '../../constants/actions';

export default (
  state = ImmutableMap({ query: '' }),
  action,
) => {
  switch (action.type) {
    case types.RECEIVE_FAVORITE_PLACES:
      return state.set('favorites', ImmutableMap().withMutations((innerMap) => {
        Object.keys(action.payload).forEach((key) => {
          const value = action.payload[key];
          innerMap.set(action.payload[key].id, fromJS(value));
        });
      }));
    case types.SET_FAVORITE:
      return state.setIn(['favorites', action.payload.placeKey], action.payload.place);
    case types.REMOVE_FAVORITE:
      return state.deleteIn(['favorites', action.payload.placeKey]);
    case types.SEARCH_QUERY:
      return state.set('query', action.payload);
    case types.RECEIVE_PLACE_CATEGORIES:
      return state.set('categories', ImmutableMap().withMutations((innerMap) => {
        Object.keys(action.payload).forEach((key) => {
          const value = action.payload[key];
          innerMap.set(action.payload[key].category, fromJS(value));
        });
      }));
    case types.RECEIVE_ONE_PLACE:
      return state.setIn(['near', action.payload.id], fromJS(action.payload));
    case types.RECEIVE_PLACE_ADDRESS:
      return state.setIn(['near', action.payload.id, 'Address'], fromJS(action.payload.data));
    case types.RECEIVE_PLACE_SCHEDULE:
      return state.setIn(['near', action.payload.id, 'schedules'], fromJS(action.payload.data));
    case types.RECEIVE_PLACE_FOURSQUARE:
      return state.setIn(['near', action.payload.id, 'Photos'], ImmutableMap().withMutations((innerMap) => {
        Object.keys(action.payload.photos).forEach((key) => {
          const value = action.payload.photos[key];
          innerMap.set(action.payload.photos[key].id, fromJS(value));
        });
      }));
    case types.RECEIVE_PLACE_REVIEWS:
      return state.setIn(['near', action.payload.id, 'Reviews'], ImmutableMap().withMutations((innerMap) => {
        Object.keys(action.payload.response).forEach((key) => {
          const value = action.payload.response[key];
          innerMap.set(action.payload.response[key].id, fromJS(value));
        });
      }));
    case types.EXTRACT_PLACE_HOURS:
      const { schedule, id, formatted } = action.payload;
      const firstMin = schedule.startTime;
      const firstMax = schedule.endTime;
      let minValue;
      let maxValue;
      if (firstMin.length === 4) {
        minValue = Number(firstMin.substr(0, 1));
      } else if (firstMin.length === 5) {
        minValue = Number(firstMin.substr(0, 2));
      }

      if (firstMax.length === 4) {
        maxValue = Number(firstMax.substr(0, 1));
        if (
          (maxValue === 1) ||
          (maxValue === 2) ||
          (maxValue === 3) ||
          (maxValue === 4)
        ) {
          maxValue = 50;
        }
      } else if (firstMax.length === 5) {
        maxValue = Number(firstMax.substr(0, 2));
        if ((maxValue === 0)) {
          maxValue = 50;
        }
      }
      return state.setIn(['near', id, 'openHours', formatted], fromJS({
        minValue,
        maxValue,
      }));
    case types.RECEIVE_PLACE_PROMOTIONS:
      const newState = state.setIn(['near', action.payload.id, 'Promotions', 'promotions'], ImmutableMap().withMutations((innerMap) => {
        Object.keys(action.payload.promotions).forEach((key) => {
          const value = action.payload.promotions[key];
          innerMap.set(action.payload.promotions[key].id, fromJS(value));
        });
      }));
      return newState.setIn(['near', action.payload.id, 'Promotions', 'coupons'], ImmutableMap().withMutations((innerMap) => {
        Object.keys(action.payload.coupons).forEach((key) => {
          const value = action.payload.coupons[key];
          innerMap.set(action.payload.coupons[key].id, fromJS(value));
        });
      }));
    case types.SET_ACTUAL_PLACE:
      return state.set('actualId', action.payload);
    case types.RECEIVE_NEAR_PLACES:
      return state.set('near', ImmutableMap().withMutations((innerMap) => {
        Object.keys(action.payload).forEach((key) => {
          const value = action.payload[key];
          innerMap.set(action.payload[key].idPlace, fromJS(value));
        });
      }));
    default:
      return state;
  }
};
