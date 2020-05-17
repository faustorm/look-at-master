import api from '../api';

export const postLogin = (data) => (
  api.user.login(data)
    .then((response) => response.json())
    .then((response) => (
      { response }
    ))
    .catch((error) => ({ error }))
);

export const postSignUp = (data) => (
  api.user.signUp(data)
    .then((response) => response.json())
    .then((response) => (
      { response }
    ))
    .catch((error) => ({ error }))
);

export const postRecovery = (data) => (
  api.user.resetPassword(data)
    .then((response) => response.json())
    .then((response) => (
      { response }
    ))
    .catch((error) => ({ error }))
);

export const checkUserTokenInfo = (token) => (
  api.user.userInfo(token)
    .then((response) => response.json())
    .then((response) => (
      { response: response.data[0] }
    ))
    .catch((error) => ({ error }))
);

export const fetchNotifications = (token) => (
  api.notifications.fetchPending({ token })
    .then((response) => response.json())
    .then((rjson) => ({ response: rjson.data }))
    .catch((error) => ({ error }))
);

export const fetchCards = (token) => (
  api.user.cards(token)
    .then((response) => response.json())
    .then((rjson) => ({ response: rjson.data }))
    .catch((error) => ({ error }))
);

export const submitCard = (token, data) => (
  api.user.addCard(token, data)
    .then((response) => response.json())
    .then(() => ({ response: 'Submitted correctly' }))
    .catch((error) => ({ error }))
);

export const fetchAddresses = (token) => (
  api.user.address(token)
    .then((response) => response.json())
    .then((rjson) => (({ response: rjson.data })))
    .catch((error) => ({ error }))
);

export const deleteCard = (id, token) => (
  api.user.deleteCard(id, token)
    .then((response) => response.json())
    .then((rjson) => ({ response: rjson.data }))
    .catch((error) => ({ error }))
);

export const submitAddress = (token, data) => (
  api.user.submitAddress({ token, data })
    .then((response) => response.json())
    .then(() => ({ status: 'success' }))
    .catch(() => ({ status: 'error' }))
);

export const submitCoupon = (token, idCoupon, idPlace) => (
  api.places.postCoupon(token, idCoupon, idPlace)
    .then((response) => response.json())
    .then(() => ({ status: 'success' }))
    .catch((rjson) => ({ status: 'error', message: rjson.message }))
);

export const deleteAddress = (token, id) => (
  api.user.deleteAddress(token, id)
    .then((response) => response.json())
    .then(() => ({ status: 'success' }))
    .catch(() => ({ status: 'error' }))
);

export const postReview = (token, data) => (
  api.user.postReview(token, data)
    .then((response) => response.json())
    .then((rjson) => ({ response: rjson }))
    .catch((error) => ({ error }))
);
