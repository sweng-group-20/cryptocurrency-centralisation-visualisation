import React from 'react';
import { useHistory } from 'react-router-dom';
import './Operational.css';
import '../index.css';
import PropTypes from 'prop-types';
import LineGraph from './LineGraph';

function Operational({ data }) {
  const history = useHistory();

  return (
    <div className="OperationalGraph">
      <h1>Operational Layer</h1>
      <button
        type="button"
        onClick={() => {
          history.goBack();
        }}
      >
        Go back
      </button>
      <LineGraph data={data} smallGraph={false} />
    </div>
  );
}

Operational.propTypes = {
  data: PropTypes.string,
};
Operational.defaultProps = { data: '' };

export default Operational;
