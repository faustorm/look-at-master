import { fork, takeEvery, call, put, select } from 'redux-saga/effects';
import { PermissionsAndroid, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { locationChanged } from '../actions/location';
import { fetchCategories, setActualPlace, setUpBasicPlace, setUpAndFetchPlace } from '../actions/places';
import { checkUserLogin, fetchNotifications, fetchUserCards, fetchUserAddresses } from '../actions/user';
import { receivedOrderInfo, receivedProductOrderDetails, receivedReservationInfo, receivedReservationAddress } from '../actions/notification';

import { fetchOrderInfo, fetchProductOrderDetails, fetchReservationInfo } from '../../data/notification';
import { fetchAddress } from '../../data/places';
import { getUserProfile } from '../selectors/user';
import { getCategories, getActualPlaceId, getNearPlaces } from '../selectors/places';
import { getActualLocation } from '../selectors/location';

import types from '../../constants/actions';
import { trackEvent } from '../../modules/Mixpanel';

const androidPermissionLocation = async () => {
  const request = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
  const granted = await PermissionsAndroid.request(request);
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }
  return false;
};

const getGeo = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject);
});

function * regularViewSetup() {
  let granted = true;
  const profile = yield select(getUserProfile);
  const actualLocation = yield select(getActualLocation);

  if (!(profile.has('token'))) {
    yield put(checkUserLogin());
  }

  if (Platform.OS === 'android' && parseFloat(DeviceInfo.getSystemVersion()) >= 6) {
    granted = yield call(androidPermissionLocation);
  }

  if (granted) {
    const location = yield call(getGeo);
    const { latitude, longitude } = location.coords;
    if (!(actualLocation.get('longitude') === longitude && actualLocation.get('latitude') === latitude)) {
      yield put((locationChanged({ longitude, latitude })));
    }
  }
}

function * handleSetupHomeView() {
  const categories = yield select(getCategories);

  if (!categories.size) {
    yield put((fetchCategories()));
  }

  yield call(trackEvent, 'Home');

  yield call(regularViewSetup);
  return undefined;
}

function * handleSetupSearchView() {
  yield call(trackEvent, 'Search');
  yield call(regularViewSetup);
  return undefined;
}

function * handleSetupHistoryView() {
  yield put(fetchNotifications());
}

function * handleSetActualNotification(action) {
  const profile = yield select(getUserProfile);
  const notification = action.payload;
  const id = action.payload.get('id');
  const type = action.payload.get('type');

  if (!notification.has('order') && type === 'order') {
    const idOrder = action.payload.get('idOrder');
    const { response, error } = yield call(fetchOrderInfo, profile.get('token'), idOrder);
    if (!error) {
      yield put(receivedOrderInfo({ id, data: response }));
    }
    const { products, productErrors } = yield call(
      fetchProductOrderDetails,
      idOrder,
    );
    if (!productErrors) {
      yield put(receivedProductOrderDetails({ id, data: products }));
    }
  }

  if (!notification.has('reservation') && type === 'reservation') {
    const idReservation = action.payload.get('idReservation');
    const { response, error } = yield call(fetchReservationInfo, profile.get('token'), idReservation);
    if (!error) {
      yield put(receivedReservationInfo({ id, data: response }));
    }
    const { address, addressError } = yield call(fetchAddress, action.payload.get('idPlace'));
    if (!addressError) {
      yield put(receivedReservationAddress({ id, data: address }));
    }
  }
}

function * handleInspectCreditCards() {
  const profile = yield select(getUserProfile);
  if (!profile.hasIn(['cards', 'data']) || profile.getIn(['cards', 'data']).size === 0) {
    yield put(fetchUserCards());
  }
}

function * handleInspectAddresses() {
  const profile = yield select(getUserProfile);
  if (!profile.hasIn(['address', 'data']) || profile.getIn(['address', 'data']).size === 0) {
    yield put(fetchUserAddresses());
  }
}

function * handleSetUpPlaceView(action) {
  const requestId = action.payload.id;
  const actualPlaceId = yield select(getActualPlaceId);
  const nearPlaces = yield select(getNearPlaces);
  if (requestId !== actualPlaceId) {
    yield put(setActualPlace(requestId));
    if (nearPlaces.has(requestId)) {
      return yield put(setUpBasicPlace(requestId));
    }
    yield put(setUpAndFetchPlace(requestId));
  }
  return undefined;
}

function * watchPlacesActions() {
  yield takeEvery(
    types.SETUP_HOME_VIEW,
    handleSetupHomeView,
  );
  yield takeEvery(
    types.SETUP_SEARCH_VIEW,
    handleSetupSearchView,
  );
  yield takeEvery(
    types.SETUP_HISTORY_VIEW,
    handleSetupHistoryView,
  );
  yield takeEvery(
    types.SET_ACTUAL_NOTIFICATION,
    handleSetActualNotification,
  );
  yield takeEvery(
    types.INSPECT_CREDIT_CARDS,
    handleInspectCreditCards,
  );
  yield takeEvery(
    types.INSPECT_ADDRESSES,
    handleInspectAddresses,
  );
  yield takeEvery(
    types.SETUP_PLACE_VIEW,
    handleSetUpPlaceView,
  );
}

export default [
  fork(watchPlacesActions),
];
