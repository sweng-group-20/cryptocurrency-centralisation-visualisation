import React from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import LineGraph from './LineGraph';
import './Application.css';
import '../index.css';

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
      <LineGraph data={data} smallGraph={false} />
    </div>
  );
}

Application.propTypes = {
  data: PropTypes.string,
};
Application.defaultProps = { data: '' };

export default Application;
