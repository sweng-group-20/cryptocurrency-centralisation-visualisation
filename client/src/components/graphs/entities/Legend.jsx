import React from 'react';
import PropTypes from 'prop-types';
import LegendItem from './LegendItem';

const Legend = ({ legendItems }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {legendItems.map((item) => (
        <div
          key={item.title}
          style={{
            backgroundColor: item.color,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '10vh',
            fontWeight: 'bolder',
            fontSize: '1.5em',
          }}
        >
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

Legend.propTypes = {
  legendItems: PropTypes.arrayOf(LegendItem).isRequired,
};

export default Legend;
