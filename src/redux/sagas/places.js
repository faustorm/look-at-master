import { fork, takeEvery, call, put, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import moment from 'moment';

import {
  fetchPlaceSchedule,
  fetchAddress,
  getFavoriteplaces,
  getNearPlaces,
  getCategories,
  setFavorite,
  unSetFavorite,
  fetchOnePlace,
  fetchPlacePromotions,
  fetchPlaceCoupons,
  fetchPlaceFoursquarePhotos,
  fetchDataPlaceReviews,
  fetchScheduleByDay,
  submitReservation,
} from '../../data/places';
import { getUserProfile } from '../selectors/user';
import { getPlaceById, getActualPlace } from '../selectors/places';
import { extractHours, receivePlaceReviews, receivePlaceFoursquarePhotos, fetchPlaceReviews, receivedPlaceSchedule, receivePlacePromotions, receiveFavoritePlaces, receivedPlaceAddress, receiveNearPlaces, receivePlaceCategories, receiveOnePlace, setUpBasicPlace } from '../actions/places';
import { setActualScheduleDay, closeAddReservation } from '../actions/session';

import types from '../../constants/actions';
import { trackEvent } from '../../modules/Mixpanel';

function * handleFetchFavoritePlaces(action) {
  const { response, error } = yield call(getFavoriteplaces, action.payload);
  if (!error) {
    return yield put(receiveFavoritePlaces(response));
  }
  return undefined;
}

function * handleFetchNearPlaces(action) {
  const { response, error } = yield call(getNearPlaces, action.payload);
  if (!error && response.data) {
    return yield put(receiveNearPlaces(response.data[0]));
  }
  return undefined;
}

function * handleSetFavorite(action) {
  const userProfile = yield select(getUserProfile);
  return yield call(setFavorite, action.payload.placeKey, userProfile.get('token'));
}

function * handleUnSetFavorite(action) {
  const userProfile = yield select(getUserProfile);
  return yield call(unSetFavorite, action.payload.placeKey, userProfile.get('token'));
}

function * handleFetchPlaceCategories() {
  const { response, error } = yield call(getCategories);
  if (!error) {
    return yield put(receivePlaceCategories(response));
  }
  return undefined;
}

function * handleSetUpBasicPlace(action) {
  const id = action.payload;
  const place = yield select(getPlaceById, id);
  if (!place.has('Address')) {
    const { address, addressError } = yield call(fetchAddress, id);
    if (!addressError) {
      yield put(receivedPlaceAddress({ id, data: address }));
    }
  }

  if (!place.has('schedules')) {
    const { schedules, scheduleError } = yield call(fetchPlaceSchedule, id);
    if (!scheduleError) {
      yield put(receivedPlaceSchedule({ id, data: schedules }));
    }
  }

  if (!place.has('Promotions')) {
    const { promotions } = yield call(fetchPlacePromotions, id);
    const { coupons } = yield call(fetchPlaceCoupons, id);
    yield put(receivePlacePromotions({ promotions, coupons, id }));
  }

  if (!place.has('Photos') && place.get('foursquare') !== null) {
    const { photos } = yield call(fetchPlaceFoursquarePhotos, place.get('foursquare'));
    yield put(receivePlaceFoursquarePhotos({ photos, id }));
  }

  if (!place.has('Reviews')) {
    yield put(fetchPlaceReviews(id));
  }
}

function * handleFetchPlaceReviews(action) {
  const id = action.payload;
  const { response, error } = yield call(fetchDataPlaceReviews, id);
  if (response && !error) {
    yield put(receivePlaceReviews({ id, response }));
  }
}

function * handleSetupFetchPlace(action) {
  const { response, error } = yield call(fetchOnePlace, action.payload);
  if (!error) {
    yield put(setUpBasicPlace(response.id));
    return yield put(receiveOnePlace(response));
  }
  return undefined;
}

function * handleFetchScheduleByDay(action) {
  const { daySearch } = action.payload;
  const formatted = moment(daySearch).format('E');
  const actualPlace = yield select(getActualPlace);
  const id = actualPlace.has('idPlace') ? actualPlace.get('idPlace') : actualPlace.get('id');
  const { response, error } = yield call(
    fetchScheduleByDay,
    { id, daySearch: formatted },
  );
  yield put(setActualScheduleDay(formatted));
  if (response && !error) {
    yield put(extractHours({ schedule: response, id, formatted }));
  }
}


function * handleSubmitReservation(action) {
  const userProfile = yield select(getUserProfile);
  const data = action.payload;
  if (data.reservationTime && data.hour && data.quantity) {
    const { error } = yield call(submitReservation, data, userProfile.get('token'));
    if (error) {
      return Alert.alert('No Hemos Podido', 'Si el problema persiste, ponte en contacto con nosotros.', [{ text: 'OK' }]);
    }
    trackEvent('Make Reservation');
    yield put(closeAddReservation());
  }

  return Alert.alert('Especifica los datos', `Para reservar una mesa en ${data.place}, es necesario que especifiques cantidad, hora y día.`, [{ text: 'OK' }]);
}

function * watchPlacesActions() {
  yield takeEvery(
    types.REQUEST_FAVORITES,
    handleFetchFavoritePlaces,
  );
  yield takeEvery(
    types.SET_FAVORITE,
    handleSetFavorite,
  );
  yield takeEvery(
    types.REMOVE_FAVORITE,
    handleUnSetFavorite,
  );
  yield takeEvery(
    types.REQUEST_PLACE_CATEGORIES,
    handleFetchPlaceCategories,
  );
  yield takeEvery(
    types.REQUEST_NEAR_PLACES,
    handleFetchNearPlaces,
  );
  yield takeEvery(
    types.SETUP_BASIC_PLACE,
    handleSetUpBasicPlace,
  );
  yield takeEvery(
    types.SETUP_FETCH_PLACE,
    handleSetupFetchPlace,
  );
  yield takeEvery(
    types.REQUEST_PLACE_REVIEWS,
    handleFetchPlaceReviews,
  );
  yield takeEvery(
    types.FETCH_SCHEDULE_BY_DAY,
    handleFetchScheduleByDay,
  );
  yield takeEvery(
    types.SUBMIT_RESERVATION,
    handleSubmitReservation,
  );
}

export default [
  fork(watchPlacesActions),
];
