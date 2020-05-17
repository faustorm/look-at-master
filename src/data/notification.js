import api from '../api';

export const fetchOrderInfo = (token, idOrder) => (
  api.notifications.analyzeOrder({
    token,
    idOrder,
  })
    .then((response) => response.json())
    .then((rjson) => {
      if (rjson.data.promoted === 1) {
        rjson.data.discountAmount = rjson.discount[0][0].amount;
        rjson.data.discountDescription = rjson.discount[0][0].description;
      }
      return { response: rjson.data };
    })
    .catch((error) => ({ error }))
);

export const fetchProductOrderDetails = (idOrder) => (
  api.notifications.orderDetails(idOrder)
    .then((response) => response.json())
    .then((rjson) => ({ products: rjson.data[0].products }))
    .catch((productErrors) => ({ productErrors }))
);

export const fetchReservationInfo = (token, idReservation) => (
  api.notifications.analyzeReservation({ token, idReservation })
    .then((response) => response.json())
    .then((rjson) => ({ response: rjson.data }))
    .catch((productErrors) => ({ productErrors }))
);
