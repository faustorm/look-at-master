import { fork, takeEvery, call, put, select } from 'redux-saga/effects';
import { Alert, AsyncStorage } from 'react-native';
import Conekta from 'react-native-conekta';
import { key } from '../../api';

import { userEntered, receiveNotifications, receiveUserCards, fetchUserCards, receiveUserAddress, fetchUserAddresses } from '../actions/user';
import { changeAuthTab, closeAddCardModal, closeAddAddress, closeReviewModal } from '../actions/session';
import { fetchFavorites, fetchPlaceReviews } from '../actions/places';
import { checkLogin, getUserProfile } from '../selectors/user';
import { registerPushwooshAfterLogin } from '../../modules/PushWoosh';
import {
  submitCard,
  postLogin,
  postSignUp,
  postRecovery,
  checkUserTokenInfo,
  fetchNotifications,
  fetchCards,
  deleteCard,
  submitAddress,
  fetchAddresses,
  submitCoupon,
  deleteAddress,
  postReview,
} from '../../data/user';

import keys from '../../constants/keys';
import tabs from '../../constants/tabs';
import types from '../../constants/actions';
import messages from '../../constants/messages';

const conektaApi = new Conekta();
conektaApi.setPublicKey(keys.conekta);

const onSuccessLogin = async (data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
};

const sendConektaRequest = (card) => new Promise((resolve, reject) => {
  conektaApi.createToken(card, (res) => {
    if (res.id) {
      resolve({ token: res.id });
    }
    reject ({ cardError: res.message_to_purchaser }); // eslint-disable-line
  }, () => reject({ cardError: 'No hemos podido procesar esta solicitud' })); // eslint-disable-line
});

const removeAuthToken = () => {
  AsyncStorage.removeItem(key);
};

function * handleRequestUserLogin(action) {
  const { response } = yield call(
    postLogin,
    action.payload.data,
  );
  if (response.status === 'success') {
    yield put(userEntered(response.data));
    return action.payload.navigation.navigate('home');
  }

  return Alert.alert(
    messages.errorHeader,
    'Asegurate de que tu correo electrónico y contraseña son correctas.',
    [{ text: 'OK' }],
  );
}

function * handleRequestSignUp(action) {
  const { response } = yield call(
    postSignUp,
    action.payload,
  );
  if (response.status === 'success') {
    Alert.alert(
      messages.success,
      'Haz creado tú cuenta exitosamente, para proceder confirma tu correo electrónico e inicia sesión.',
      [{ text: 'OK' }],
    );
    return yield put(changeAuthTab(tabs.LOGIN_TAB));
  }

  return Alert.alert(
    messages.errorHeader,
    'No hemos podido, asegurate de que no haz creado una cuenta antes con este correo electrónico.',
    [{ text: 'OK' }],
  );
}

function * handleRequestRecoverPassword(action) {
  const { response } = yield call(
    postRecovery,
    action.payload,
  );
  if (response.status === 'success') {
    Alert.alert(
      messages.success,
      'Hemos enviado un correo con indicaciones para recuperar tu contraseña.',
      [{ text: 'OK' }],
    );
    return yield put(changeAuthTab(tabs.LOGIN_TAB));
  }

  return Alert.alert(
    messages.errorHeader,
    'No hemos podido, asegurate de que haz creado una cuenta antes con este correo electrónico.',
    [{ text: 'OK' }],
  );
}

function * handleReceiveUser(action) {
  yield call(registerPushwooshAfterLogin, action.payload.token);
  yield call(onSuccessLogin, JSON.stringify(action.payload));
  yield put(fetchFavorites(action.payload.token));
  yield put(fetchUserAddresses());
}

function * handleCheckLogin() {
  const { token } = yield call(checkLogin);
  if (!token) {
    return undefined;
  }
  const { response, error } = yield call(checkUserTokenInfo, token);
  if (error) {
    return removeAuthToken();
  }
  return yield put(userEntered(response));
}

function * handleFetchNotifications() {
  const profile = yield select(getUserProfile);
  const { response, error } = yield call(fetchNotifications, profile.get('token'));
  if (!error) {
    return yield put(receiveNotifications(response));
  }
  return undefined;
}

function * handleFetchUserCards() {
  const profile = yield select(getUserProfile);
  const { response, error } = yield call(fetchCards, profile.get('token'));
  if (!error) {
    return yield put(receiveUserCards(response));
  }
  return undefined;
}

function * handleFetchUserAddresses() {
  const profile = yield select(getUserProfile);
  const { response, error } = yield call(fetchAddresses, profile.get('token'));
  if (!error) {
    return yield put(receiveUserAddress(response));
  }
  return undefined;
}

function * handleDeleteCard(action) {
  const profile = yield select(getUserProfile);
  yield call(deleteCard, action.payload.get('id'), profile.get('token'));
}

function * handleDeleteAddress(action) {
  const profile = yield select(getUserProfile);
  yield call(deleteAddress, profile.get('token'), action.payload.get('id'));
}

function * handleSubmitCard(action) {
  const card = action.payload;
  const profile = yield select(getUserProfile);

  if (card.cardNumber) {
    if (card.name) {
      if (card.expYear && card.expMonth) {
        if (card.cvc) {
          const { token, cardError } = yield call(sendConektaRequest, card);
          if (cardError) {
            return Alert.alert(messages.errorHeader, cardError, [{ text: 'OK' }]);
          }
          const cardRequest = {
            token,
            cardName: card.cardNumber,
            bankName: 'unknown',
            type: 'unknown',
          };
          const { error } = yield call(submitCard, profile.get('token'), cardRequest);
          if (!error) {
            yield put(fetchUserCards({ justAdded: true }));
            return yield put(closeAddCardModal());
          }
          return Alert.alert(messages.errorHeader, 'No hemos podido guardar esta tarjeta');
        }
        return Alert.alert('Falta Código', '4 En AMEX, 3 en cualquier otro banco.', [{ text: 'OK' }]);
      }
      return Alert.alert('Falta fecha de Vencimiento', 'Es necesario que indiques que mes y año vence la tarjeta.', [{ text: 'OK' }]);
    }
    return Alert.alert('Falta el tarjetahabiente', 'El nombre de a quien esta la persona', [{ text: 'OK' }]);
  }
  return Alert.alert('Falta el Número de Tarjeta', 'Este Número es el que aparece en la parte frontal con 16 dígitos', [{ text: 'OK' }]);
}

function * handleSubmitAddress(action) {
  const profile = yield select(getUserProfile);
  const addressRequest = action.payload;
  if (typeof addressRequest.zipCode === 'string' || isNaN(addressRequest.zipCode.isNumber) === true) { // eslint-disable-line
    addressRequest.zipCode = 100;
  }

  if (!addressRequest.idCity) {
    addressRequest.idCity = 1;
  }

  const { status } = yield call(submitAddress, profile.get('token'), addressRequest);
  if (status !== 'error') {
    yield put(fetchUserAddresses());
    return yield put(closeAddAddress());
  }
  return undefined;
}

function * handlePostCoupon(action) {
  const profile = yield select(getUserProfile);
  const { status, message } = yield call(submitCoupon, profile.get('token'), action.payload.idCoupon, action.payload.idPlace);
  if (status === 'error') {
    return Alert.alert(messages.errorHeader, message);
  }
  return Alert.alert(messages.success, 'Haz guardado este cupón con éxito.');
}

function * handleSubmitReview(action) {
  const profile = yield select(getUserProfile);
  const data = action.payload;
  if (data.rate && data.comment) {
    const sendData = {
      rate: data.rate,
      comment: data.comment,
      idPlace: data.idPlace,
    };
    const { error } = yield call(postReview, sendData, profile.get('token'));
    if (error) {
      return Alert.alert(messages.errorHeader, 'Si el problema persiste, ponte en contacto con nosotros.', [{ text: 'OK' }]);
    }
    yield put(fetchPlaceReviews(data.idPlace));
    return yield put(closeReviewModal());
  }
  return Alert.alert('Llena todos los campos', 'Es necesario que establezcas tu calificación y como fue tu experiencia.', [{ text: 'OK' }]);
}

function * watchUserActions() {
  yield takeEvery(
    types.REQUEST_USER_LOGIN,
    handleRequestUserLogin,
  );
  yield takeEvery(
    types.REQUEST_SIGN_UP,
    handleRequestSignUp,
  );
  yield takeEvery(
    types.REQUEST_RECOVER_PASSWORD,
    handleRequestRecoverPassword,
  );
  yield takeEvery(
    types.RECEIVE_USER,
    handleReceiveUser,
  );
  yield takeEvery(
    types.CHECK_LOGIN,
    handleCheckLogin,
  );
  yield takeEvery(
    types.FETCH_NOTIFICATIONS,
    handleFetchNotifications,
  );
  yield takeEvery(
    types.FETCH_USER_CARDS,
    handleFetchUserCards,
  );
  yield takeEvery(
    types.FETCH_USER_ADDRESS,
    handleFetchUserAddresses,
  );
  yield takeEvery(
    types.DELETE_CARD,
    handleDeleteCard,
  );
  yield takeEvery(
    types.SUBMIT_CARD,
    handleSubmitCard,
  );
  yield takeEvery(
    types.SUBMIT_ADDRESS,
    handleSubmitAddress,
  );
  yield takeEvery(
    types.POST_COUPON,
    handlePostCoupon,
  );
  yield takeEvery(
    types.DELETE_ADDRESS,
    handleDeleteAddress,
  );
  yield takeEvery(
    types.SUBMIT_REVIEW,
    handleSubmitReview,
  );
}

export default [
  fork(watchUserActions),
];
