import keys from './constants/keys';
import moment from 'moment';

const host = 'https://api.lookatapp.co';

const today = moment().format('YYYY/MM/DD');
const date = moment().format('YYYYMMDD');

const getHeader = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const postHeader = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const deleteHeader = {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const FOURSQUARE_API = {
  clientSercet: 'PJ2ILBAZ1QO1U4C5PRFULWCV4HOVUROYWHOZOUU5YSDSNTU4',
  clientId: 'O5LYGQDZ2B4VURAL3AHYZU01GW3JFKINRONNUTG5GVSIOXG0',
};

module.exports = {
  key: '@lookat:session',
  user: {
    postReview(data, token) {
      const url = `${host}/review`;
      postHeader.body = JSON.stringify(data);
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    address(token) {
      const url = `${host}/addressUser`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    deleteAddress(token, id) {
      const url = `${host}/address/user?id=${id}`;
      deleteHeader.headers.authorization = token;
      return fetch(url, deleteHeader);
    },
    login(data) {
      const url = `${host}/user/login`;
      postHeader.body = JSON.stringify(data);
      return fetch(url, postHeader);
    },
    signUp(data) {
      const url = `${host}/user`;
      postHeader.body = JSON.stringify(data);
      return fetch(url, postHeader);
    },
    resetPassword(mail) {
      const url = `${host}/reset/password?email=${mail}`;
      return fetch(url, postHeader);
    },
    userInfo(token) {
      const url = `${host}/user`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    updateUserDeviceInfo(data) {
      const url = `${host}/user/pushtoken`;
      postHeader.body = JSON.stringify(data.user);
      postHeader.headers.authorization = data.token;
      return fetch(url, postHeader);
    },
    cards(token) {
      const url = `${host}/card`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    addCard(token, data) {
      const url = `${host}/card`;
      postHeader.body = JSON.stringify(data);
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    deleteCard(id, token) {
      const url = `${host}/card?id=${id}`;
      deleteHeader.headers.authorization = token;
      return fetch(url, deleteHeader);
    },
    submitAddress({ token, data }) {
      const url = `${host}/address/user`;
      postHeader.body = JSON.stringify(data);
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
  },
  location: {
    googleLocation({ latitude, longitude }) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${keys.google}`;
      return fetch(url, getHeader);
    },
  },
  places: {
    foursquare({ venueId }) {
      const url = `https://api.foursquare.com/v2/venues/${venueId}/photos?limit=20&client_id=${FOURSQUARE_API.clientId}&client_secret=${FOURSQUARE_API.clientSercet}&v=${date}`;
      return fetch(url, getHeader);
    },
    postReservation(data, token) {
      const url = `${host}/reservation`;
      postHeader.body = JSON.stringify(data);
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    reviews({ id }) {
      const url = `${host}/review/${id}`;
      return fetch(url, getHeader);
    },
    postCoupon(token, idCoupon, idPlace) {
      const url = `${host}/ticket?idPlace=${idPlace}&idCoupon=${idCoupon}`;
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    address(id) {
      const url = `${host}/address/${id}`;
      return fetch(url, getHeader);
    },
    categories() {
      const url = `${host}/category`;
      return fetch(url, getHeader);
    },
    schedule({ id }) {
      const url = `${host}/schedule/${id}`;
      return fetch(url, getHeader);
    },
    profile({ id }) {
      const url = `${host}/place/profile?id=${id}`;
      return fetch(url, getHeader);
    },
    promotions({ id }) {
      const url = `${host}/promotion/${id}?today=${today}`;
      return fetch(url, getHeader);
    },
    coupons({ id }) {
      const url = `${host}/coupon/place?idPlace=${id}&&today=${today}`;
      return fetch(url, getHeader);
    },
    favorites(token) {
      const url = `${host}/favorite`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    recommendation({ city }) {
      const url = `${host}/print?city=${city}`;
      return fetch(url, getHeader);
    },
    near({ lat, lng }) {
      const url = `${host}/place/near?lat=${lat}&lng=${lng}`;
      return fetch(url, getHeader);
    },
    postFavorite(id, token) {
      const url = `${host}/upload/favorite?idPlace=${id}`;
      postHeader.headers.authorization = token;
      return fetch(url, postHeader);
    },
    unFavorite(id, token) {
      const url = `${host}/delete/favorite?idPlace=${id}`;
      deleteHeader.headers.authorization = token;
      return fetch(url, deleteHeader);
    },
  },
  notifications: {
    fetchPending({ token }) {
      const url = `${host}/notification`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    orderDetails(idOrder) {
      const url = `${host}/order/detail?idOrder=${idOrder}`;
      return fetch(url, getHeader);
    },
    analyzeOrder({ token, idOrder }) {
      const url = `${host}/orderUser?id=${idOrder}`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
    analyzeReservation({ token, idReservation }) {
      const url = `${host}/reservationUser?id=${idReservation}`;
      getHeader.headers.authorization = token;
      return fetch(url, getHeader);
    },
  },
  schedule: {
    day({ id, daySearch }) {
      const url = `${host}/search/schedule/day?id=${id}&day=${daySearch}`;
      return fetch(url, getHeader);
    },
  },
};
