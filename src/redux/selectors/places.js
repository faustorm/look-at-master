import { Map as ImmutableMap } from 'immutable';

export const getCategories = (state) => state.place.get('categories', ImmutableMap());

export const getIsFavorite = (state, id) => state.place.get('favorites', ImmutableMap()).has(id);

export const getNearPlaces = (state) => state.place.get('near', ImmutableMap());

export const getQueriedPlaces = (state, params) => state.place.get('near', ImmutableMap()).filter((place) => {
  const name = place.get('place');
  const branch = place.get('branch');
  return (
    ((branch.toLowerCase().indexOf(state.place.get('query').toLowerCase()) !== -1)
    || (name.toLowerCase().indexOf(state.place.get('query').toLowerCase()) !== -1))
    &&
    (params && params.keyValue
      ?
      place.get(params.keyValue) === params.value
      :
      true
    )
  );
});

export const getPlaceById = (state, id) => (state.place.get('near', ImmutableMap({})).get(id, ImmutableMap({ })));

export const getActualPlace = (state) => (
  state.place.get('near', ImmutableMap({})).get(state.place.get('actualId'), undefined)
);

export const getActualPlaceId = (state) => (state.place.get('actualId', undefined));

export const getScheduleByDay = (state, ownProps) => {
  const idPlace = state.place.get('actualId');
  const currentDay = state.session.get('actualScheduleDay', undefined);
  const place = state.place.get('near').get(idPlace, ImmutableMap({}));
  if (currentDay && place.hasIn(['openHours', currentDay])) {
    return place.get('openHours', ImmutableMap({})).get(currentDay);
  }
  return ImmutableMap({ });
};

export default getCategories;
