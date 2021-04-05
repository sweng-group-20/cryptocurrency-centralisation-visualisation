import PropTypes from 'prop-types';

export const lineGraphDataType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.string,
        y: PropTypes.number,
      })
    ),
  })
);

export const pieChartDataType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.number,
  })
);
