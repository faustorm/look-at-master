import types from '../../constants/actions';

export const changeAuthTab = (payload) => ({
  type: types.CHANGE_AUTH_TAB,
  payload,
});

export const setUpHomeView = (payload) => ({
  type: types.SETUP_HOME_VIEW,
  payload,
});

export const setUpSearchView = () => ({
  type: types.SETUP_SEARCH_VIEW,
});

export const setUpHistoryView = () => ({
  type: types.SETUP_HISTORY_VIEW,
});

export const setActualNotification = (payload) => ({
  type: types.SET_ACTUAL_NOTIFICATION,
  payload,
});

export const closeNotification = () => ({
  type: types.CLOSE_NOTIFICATION,
});

export const inspectCreditCards = (payload) => ({
  type: types.INSPECT_CREDIT_CARDS,
  payload,
});

export const inspectAddresses = (payload) => ({
  type: types.INSPECT_ADDRESSES,
  payload,
});

export const closeCreditCards = (payload) => ({
  type: types.CLOSE_CREDIT_CARDS,
  payload,
});

export const openAddCardModal = () => ({
  type: types.OPEN_ADD_CARD,
});

export const closeAddCardModal = () => ({
  type: types.CLOSE_ADD_CARD,
});

export const closeMenuOpenAddCard = () => ({
  type: types.CLOSE_MENU_OPEN_ADD_CARD,
});

export const closeAddAddress = () => ({
  type: types.CLOSE_ADD_ADDRESS,
});

export const closeAddressMenuOpenAdd = () => ({
  type: types.CLOSE_ADDRESS_MENU_OPEN_ADD,
});

export const closeAddressManager = () => ({
  type: types.CLOSE_ADDRESS_MANAGER,
});

export const setUpPlaceView = (payload) => ({
  type: types.SETUP_PLACE_VIEW,
  payload,
});

export const closeAddReservation = () => ({
  type: types.CLOSE_ADD_RESERVATION,
});

export const setActualScheduleDay = (payload) => ({
  type: types.SET_ACTUAL_SCHEDULE_DAY,
  payload,
});

export const openReservationModal = () => ({
  type: types.OPEN_ADD_RESERVATION,
});

export const openReviewmodal = () => ({
  type: types.OPEN_REVIEW_MODAL,
});

export const closeReviewModal = () => ({
  type: types.CLOSE_REVIEW_MODAL,
});

export default changeAuthTab;
