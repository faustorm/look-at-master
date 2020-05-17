import { AsyncStorage } from 'react-native';
import { Map as ImmutableMap } from 'immutable';
import { key } from '../../api';

export const getUserProfile = (state) => state.user || ImmutableMap();

export const checkLogin = () => (
  AsyncStorage.getItem(key).then((checkSession) => {
    if (checkSession) {
      const { token } = JSON.parse(checkSession);
      if (token) {
        return { token };
      }
      return {};
    }
    return {};
  })
);

export const actualNotification = (state) => {
  const id = state.session.get('actualNotification', ImmutableMap()).get('id');
  return state.user.get('notifications', ImmutableMap()).get(id, ImmutableMap());
};

export const getCardsData = (state) => (
  state.user.get('cards', ImmutableMap()).get('data', ImmutableMap())
);

export const getAddressData = (state) => (
  state.user.get('address', ImmutableMap()).get('data', ImmutableMap())
);

export const analyzingCardList = (state) => (
  state.user.get('cards', ImmutableMap()).get('analyzing', false)
);

export const analyzingAddresses = (state) => (
  state.session.get('analyzingAddress', false)
);

export const getUserAddress = (state, id) => (
  state.user.getIn(['address', id], ImmutableMap({}))
);