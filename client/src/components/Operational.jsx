import React from 'react';
import { useHistory } from 'react-router-dom';

import LineGraph from './LineGraph';
import { lineGraphDataType } from './types';
import './Operational.css';
import '../index.css';

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
      <div className="linegraph">
        <LineGraph data={data} smallGraph={false} yScaleType="linear" />
      </div>
    </div>
  );
}

Operational.propTypes = { data: lineGraphDataType };
Operational.defaultProps = { data: [] };

export default Operational;
