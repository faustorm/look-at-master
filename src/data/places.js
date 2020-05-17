import api from '../api';

export const getFavoriteplaces = (token) => (
  api.places.favorites(token)
    .then((response) => response.json())
    .then((rjson) => {
      const toRender = [];
      for (let i = 0; i < rjson.data.length; i++) {
        toRender.push(rjson.data[i].Place);
      }
      return { response: toRender };
    })
    .catch((error) => ({ error }))
);

export const getCategories = () => (
  api.places.categories()
    .then((response) => response.json())
    .then((rjson) => ({ response: rjson.data }))
    .catch((error) => ({ error }))
);

export const setFavorite = (id, token) => (
  api.places.postFavorite(id, token)
    .then((response) => response.json())
    .then((rjson) => ({ response: rjson.data }))
    .catch((error) => ({ error }))
);

export const unSetFavorite = (id, token) => (
  api.places.unFavorite(id, token)
    .then((response) => response.json())
    .then((rjson) => ({ response: rjson.data }))
    .catch((error) => ({ error }))
);

export const getNearPlaces = (location) => (
  api.places.near(location)
    .then((response) => response.json())
    .then((response) => ({ response }))
    .catch((error) => ({ error }))
);

export const fetchAddress = (id) => (
  api.places.address(id)
    .then((response) => response.json())
    .then((rjson) => ({ address: rjson.data[0] }))
    .catch((error) => ({ addressError: error }))
);

export const fetchOnePlace = (id) => (
  api.places.profile({ id })
    .then((response) => response.json())
    .then((rjson) => ({ response: rjson.data[0] }))
    .catch((error) => ({ error }))
);

export const fetchPlaceSchedule = (id) => (
  api.places.schedule({ id })
    .then((response) => response.json())
    .then((rjson) => {
      if (rjson.data.length > 0) {
        return ({ schedules: rjson.data });
      }
      return ({ schedules: [] });
    })
    .catch((scheduleError) => ({ scheduleError }))
);

export const fetchPlacePromotions = (id) => (
  api.places.promotions({ id })
    .then((response) => response.json())
    .then((rjson) => ({ promotions: rjson.data }))
);

export const fetchPlaceCoupons = (id) => (
  api.places.coupons({ id })
    .then((response) => response.json())
    .then((rjson) => ({ coupons: rjson.data }))
);

export const fetchPlaceFoursquarePhotos = (id) => (
  api.places.foursquare({ venueId: id })
    .then((response) => response.json())
    .then((rjson) => ({ photos: rjson.response.photos.items }))
    .catch((error) => ({ error }))
);

export const fetchDataPlaceReviews = (id) => (
  api.places.reviews({ id })
    .then((response) => response.json())
    .then((rjson) => ({ response: rjson.data }))
    .catch((error) => ({ error }))
);

export const fetchScheduleByDay = (data) => (
  api.schedule.day(data)
    .then((response) => response.json())
    .then((rjson) => {
      return ({ response: rjson.data[0] });
    })
    .catch((error) => ({ error }))
);

export const submitReservation = (data, token) => (
  api.places.postReservation(data, token)
    .then((response) => response.json())
    .then((rjson) => ({ response: rjson }))
    .catch((rjson) => ({ error: rjson }))
);
