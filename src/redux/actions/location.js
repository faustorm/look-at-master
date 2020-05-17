import types from '../../constants/actions';

export const locationChanged = ({ latitude, longitude }) => ({
  type: types.LOCATION_CHANGED,
  payload: {
    lat: latitude,
    lng: longitude,
  },
});

export const cityEntered = ({ city }) => ({
  type: types.CITY_ENTERED,
  payload: {
    city,
  },
});
