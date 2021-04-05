import React from 'react';
import { useHistory } from 'react-router-dom';

import LineGraph from './LineGraph';
import './Application.css';
import '../index.css';
import { lineGraphDataType } from './types';

function Application({ data }) {
  const history = useHistory();

  return (
    <div className="ApplicationGraph">
      <h1>Application Layer</h1>
      <button
        type="button"
        onClick={() => {
          history.goBack();
        }}
      >
        Go back
      </button>
      <div className="linegraph">
        <LineGraph data={data} smallGraph={false} yScaleType="log" />
      </div>
    </div>
  );
}

Application.propTypes = lineGraphDataType;
Application.defaultProps = { data: [] };

export default Application;
