export const getAuthTab = (state) => state.session.get('actualAuthTab');

export const addingCard = (state) => state.session.get('addingCard', false);

export default getAuthTab;
