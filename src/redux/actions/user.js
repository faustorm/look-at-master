import types from '../../constants/actions';

export const requestLogin = (payload) => ({
  type: types.REQUEST_USER_LOGIN,
  payload,
});

export const requestSignUp = (payload) => ({
  type: types.REQUEST_SIGN_UP,
  payload,
});

export const requestRecoverPassword = (payload) => ({
  type: types.REQUEST_RECOVER_PASSWORD,
  payload,
});

export const userEntered = (payload) => ({
  type: types.RECEIVE_USER,
  payload,
});

export const userlogOut = (payload) => ({
  type: types.USER_LOGOUT,
  payload,
});

export const requestFacebookLogin = (payload) => ({
  type: types.REQUEST_FACEBOOK_LOGIN,
  payload,
});

export const checkUserLogin = () => ({
  type: types.CHECK_LOGIN,
});

export const fetchNotifications = (payload) => ({
  type: types.FETCH_NOTIFICATIONS,
  payload,
});

export const fetchUserCards = (payload) => ({
  type: types.FETCH_USER_CARDS,
  payload,
});

export const fetchUserAddresses = (payload) => ({
  type: types.FETCH_USER_ADDRESS,
  payload,
});

export const receiveUserAddress = (payload) => ({
  type: types.RECEIVE_USER_ADDRESS,
  payload,
});

export const postCoupon = (payload) => ({
  type: types.POST_COUPON,
  payload,
});

export const receiveUserCards = (payload) => ({
  type: types.RECEIVE_USER_CARDS,
  payload,
});

export const deleteCard = (payload) => ({
  type: types.DELETE_CARD,
  payload,
});

export const deleteAddress = (payload) => ({
  type: types.DELETE_ADDRESS,
  payload,
});

export const submitCard = (payload) => ({
  type: types.SUBMIT_CARD,
  payload,
});

export const submitAddress = (payload) => ({
  type: types.SUBMIT_ADDRESS,
  payload,
});

export const receiveNotifications = (payload) => ({
  type: types.RECEIVE_NOTIFICATIONS,
  payload,
});

export const submitReview = (payload) => ({
  type: types.SUBMIT_REVIEW,
  payload,
});
