import types from '../../constants/actions';

export const receivedOrderInfo = (payload) => ({
  type: types.RECEIVE_ORDER_INFO,
  payload,
});

export const receivedProductOrderDetails = (payload) => ({
  type: types.RECEIVE_PRODUCT_ORDER_INFO,
  payload,
});

export const receivedReservationInfo = (payload) => ({
  type: types.RECEIVE_RESERVATION_INFO,
  payload,
});

export const receivedReservationAddress = (payload) => ({
  type: types.RECEIVE_RESERVATION_ADDRESS,
  payload,
});

export const receivedOrderAddress = (payload) => ({
  type: types.RECEIVE_ORDER_ADDRESS,
  payload,
});
