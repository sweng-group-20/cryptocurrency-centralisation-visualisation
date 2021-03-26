import PropTypes from 'prop-types';

const matchType = PropTypes.exact({
  isExact: PropTypes.bool,
  params: PropTypes.shape({}),
  path: PropTypes.string,
  url: PropTypes.string,
});

export default matchType;
