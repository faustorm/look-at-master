import { fork, all } from 'redux-saga/effects';

import user from './user';
import facebook from './facebook';
import places from './places';
import location from './location';
import session from './session';

function * startAppSagas() {
  yield all([
    ...user,
    ...facebook,
    ...places,
    ...location,
    ...session,
  ]);
}

export default function * () {
  yield fork(startAppSagas);
}
