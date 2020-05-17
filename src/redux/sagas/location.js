import { fork, takeEvery, call, put } from 'redux-saga/effects';

import { cityEntered } from '../actions/location';
import { getActualCity } from '../../data/location';
import { fetchNearPlaces } from '../actions/places';

import types from '../../constants/actions';

function * handleLocationEntered(action) {
  yield put(fetchNearPlaces(action.payload));
  const { response, error } = yield call(
    getActualCity,
    action.payload,
  );
  if (!error) {
    yield put(cityEntered(response));
  }
}

function * watchLocationActions() {
  yield takeEvery(
    types.LOCATION_CHANGED,
    handleLocationEntered,
  );
}

export default [
  fork(watchLocationActions),
];
