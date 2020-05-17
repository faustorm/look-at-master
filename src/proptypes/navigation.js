import PropTypes from 'prop-types';

const navigation = PropTypes.shape({
  state: PropTypes.object.isRequired,
  setParams: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
});

export default navigation;
