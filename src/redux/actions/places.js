import types from '../../constants/actions';

export const fetchFavorites = (payload) => ({
  type: types.REQUEST_FAVORITES,
  payload,
});

export const searchQuery = (payload) => ({
  type: types.SEARCH_QUERY,
  payload,
});

export const setActualPlace = (payload) => ({
  type: types.SET_ACTUAL_PLACE,
  payload,
});

export const receivePlacePromotions = (payload) => ({
  type: types.RECEIVE_PLACE_PROMOTIONS,
  payload,
});

export const setUpBasicPlace = (payload) => ({
  type: types.SETUP_BASIC_PLACE,
  payload,
});

export const setUpAndFetchPlace = (payload) => ({
  type: types.SETUP_FETCH_PLACE,
  payload,
});

export const receiveOnePlace = (payload) => ({
  type: types.RECEIVE_ONE_PLACE,
  payload,
});

export const receivedPlaceAddress = (payload) => ({
  type: types.RECEIVE_PLACE_ADDRESS,
  payload,
});

export const receivedPlaceSchedule = (payload) => ({
  type: types.RECEIVE_PLACE_SCHEDULE,
  payload,
});

export const fetchCategories = (payload) => ({
  type: types.REQUEST_PLACE_CATEGORIES,
  payload,
});

export const setFavorite = (payload) => ({
  type: types.SET_FAVORITE,
  payload,
});

export const removeFavorite = (payload) => ({
  type: types.REMOVE_FAVORITE,
  payload,
});

export const receivePlaceCategories = (payload) => ({
  type: types.RECEIVE_PLACE_CATEGORIES,
  payload,
});

export const fetchNearPlaces = (payload) => ({
  type: types.REQUEST_NEAR_PLACES,
  payload,
});

export const fetchPlaceReviews = (payload) => ({
  type: types.REQUEST_PLACE_REVIEWS,
  payload,
});

export const receivePlaceReviews = (payload) => ({
  type: types.RECEIVE_PLACE_REVIEWS,
  payload,
});

export const receiveFavoritePlaces = (payload) => ({
  type: types.RECEIVE_FAVORITE_PLACES,
  payload,
});

export const receiveNearPlaces = (payload) => ({
  type: types.RECEIVE_NEAR_PLACES,
  payload,
});

export const fetchScheduleByDay = (payload) => ({
  type: types.FETCH_SCHEDULE_BY_DAY,
  payload,
});

export const extractHours = (payload) => ({
  type: types.EXTRACT_PLACE_HOURS,
  payload,
});

export const submitReservation = (payload) => ({
  type: types.SUBMIT_RESERVATION,
  payload,
});

export const receivePlaceFoursquarePhotos = (payload) => ({
  type: types.RECEIVE_PLACE_FOURSQUARE,
  payload,
});

export default fetchFavorites;
