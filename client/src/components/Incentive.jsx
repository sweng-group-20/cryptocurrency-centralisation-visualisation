import React from 'react';
import { useHistory } from 'react-router-dom';
import './Incentive.css';
import '../index.css';
import PropTypes from 'prop-types';
import PieChart from './PieChart';

function Incentive({ data }) {
  const history = useHistory();

  return (
    <div className="IncentiveGraph">
      <h1>Incentive Layer</h1>
      <button
        type="button"
        onClick={() => {
          history.goBack();
        }}
      >
        Go back
      </button>
      <PieChart data={data} smallGraph={false} />
    </div>
  );
}

Incentive.propTypes = {
  data: PropTypes.string,
};
Incentive.defaultProps = { data: '' };

export default Incentive;
