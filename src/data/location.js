import api from '../api';

export const getActualCity = ({ latitude, longitude }) => (
  api.location.googleLocation({ latitude, longitude })
    .then((response) => response.json())
    .then((rjson) => {
      const city = rjson.results[0].address_components[3].long_name;
      return { response: city };
    })
    .catch((error) => ({ error }))
);

export default getActualCity;
