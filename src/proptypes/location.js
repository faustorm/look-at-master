import PropTypes from 'prop-types';
import { mapContains } from 'react-immutable-proptypes';

const location = mapContains({
  coords: mapContains({
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
  }),
  city: PropTypes.string.isRequired,
});

export default location;
