const actions = {
  // User
  REQUEST_USER_LOGIN: 'request_user_login',
  REQUEST_SIGN_UP: 'request_sign_up',
  REQUEST_RECOVER_PASSWORD: 'request_recover_password',
  REQUEST_FACEBOOK_LOGIN: 'REQUEST_FACEBOOK_LOGIN',
  RECEIVE_USER: 'receive_user',
  USER_LOGOUT: 'user_logout',
  CHECK_LOGIN: 'CHECK_LOGIN',
  FETCH_NOTIFICATIONS: 'FETCH_NOTIFICATIONS',
  FETCH_USER_CARDS: 'FETCH_USER_CARDS',
  DELETE_CARD: 'DELETE_CARD',
  RECEIVE_NOTIFICATIONS: 'RECEIVE_NOTIFICATIONS',
  SUBMIT_CARD: 'SUBMIT_CARD',
  FETCH_USER_ADDRESS:  'FETCH_USER_ADDRESS',
  DELETE_ADDRESS: 'DELETE_ADDRESS',
  RECEIVE_USER_ADDRESS: 'RECEIVE_USER_ADDRESS',
  CLOSE_ADDRESS_MANAGER: 'CLOSE_ADDRESS_MANAGER',
  SUBMIT_ADDRESS: 'SUBMIT_ADDRESS',
  POST_COUPON: 'POST_COUPON',
  SUBMIT_REVIEW: 'SUBMIT_REVIEW',

  // Notification
  RECEIVE_ORDER_INFO: 'RECEIVE_ORDER_INFO',
  RECEIVE_PRODUCT_ORDER_INFO: 'RECEIVE_PRODUCT_ORDER_INFO',
  RECEIVE_RESERVATION_INFO: 'RECEIVE_RESERVATION_INFO',
  RECEIVE_RESERVATION_ADDRESS: 'RECEIVE_RESERVATION_ADDRESS',
  RECEIVE_ORDER_ADDRESS: 'RECEIVE_ORDER_ADDRESS',

  // Location
  LOCATION_CHANGED: 'LOCATION_CHANGED',
  CITY_ENTERED: 'city_entered',

  // Session
  CHANGE_AUTH_TAB: 'CHANGE_AUTH_TAB',
  SETUP_HOME_VIEW: 'SETUP_HOME_VIEW',
  SETUP_HISTORY_VIEW: 'SETUP_HISTORY_VIEW',
  SET_ACTUAL_NOTIFICATION: 'SET_ACTUAL_NOTIFICATION',
  CLOSE_NOTIFICATION: 'CLOSE_NOTIFICATION',
  INSPECT_CREDIT_CARDS: 'INSPECT_CREDIT_CARDS',
  RECEIVE_USER_CARDS: 'RECEIVE_USER_CARDS',
  CLOSE_CREDIT_CARDS: 'CLOSE_CREDIT_CARDS',
  CLOSE_ADD_CARD: 'CLOSE_ADD_CARD',
  OPEN_ADD_CARD: 'OPEN_ADD_CARD',
  CLOSE_MENU_OPEN_ADD_CARD: 'CLOSE_MENU_OPEN_ADD_CARD',
  INSPECT_ADDRESSES: 'INSPECT_ADDRESSES',
  CLOSE_ADD_ADDRESS: 'CLOSE_ADD_ADDRESS',
  CLOSE_ADDRESS_MENU_OPEN_ADD: 'CLOSE_ADDRESS_MENU_OPEN_ADD',
  SETUP_PLACE_VIEW: 'SETUP_PLACE_VIEW',
  OPEN_REVIEW_MODAL: 'OPEN_REVIEW_MODAL',
  CLOSE_REVIEW_MODAL: 'CLOSE_REVIEW_MODAL',
  CLOSE_ADD_RESERVATION: 'CLOSE_ADD_RESERVATION',
  SET_ACTUAL_SCHEDULE_DAY: 'SET_ACTUAL_SCHEDULE_DAY',
  OPEN_ADD_RESERVATION: 'OPEN_ADD_RESERVATION',

  // Places
  REQUEST_FAVORITES: 'REQUEST_FAVORITES',
  RECEIVE_FAVORITE_PLACES: 'RECEIVE_FAVORITE_PLACES',
  REQUEST_NEAR_PLACES: 'REQUEST_NEAR_PLACES',
  RECEIVE_NEAR_PLACES: 'RECEIVE_NEAR_PLACES',
  REQUEST_PLACE_CATEGORIES: 'REQUEST_PLACE_CATEGORIES',
  RECEIVE_PLACE_CATEGORIES: 'RECEIVE_PLACE_CATEGORIES',
  SET_FAVORITE: 'SET_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  SETUP_SEARCH_VIEW: 'SETUP_SEARCH_VIEW',
  SEARCH_QUERY: 'SEARCH_QUERY',
  SET_ACTUAL_PLACE: 'SET_ACTUAL_PLACE',
  SETUP_BASIC_PLACE: 'SETUP_BASIC_PLACE',
  SETUP_FETCH_PLACE: 'SETUP_FETCH_PLACE',
  RECEIVE_ONE_PLACE: 'RECEIVE_ONE_PLACE',
  RECEIVE_PLACE_ADDRESS: 'RECEIVE_PLACE_ADDRESS',
  RECEIVE_PLACE_SCHEDULE: 'RECEIVE_PLACE_SCHEDULE',
  RECEIVE_PLACE_PROMOTIONS: 'RECEIVE_PLACE_PROMOTIONS',
  RECEIVE_PLACE_FOURSQUARE: 'RECEIVE_PLACE_FOURSQUARE',
  RECEIVE_PLACE_REVIEWS: 'RECEIVE_PLACE_REVIEWS',
  REQUEST_PLACE_REVIEWS: 'REQUEST_PLACE_REVIEWS',
  FETCH_SCHEDULE_BY_DAY: 'FETCH_SCHEDULE_BY_DAY',
  EXTRACT_PLACE_HOURS: 'EXTRACT_PLACE_HOURS',
  SUBMIT_RESERVATION: 'SUBMIT_RESERVATION',
};

export default actions;
