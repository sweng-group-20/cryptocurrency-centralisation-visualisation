import React from 'react';
import { useHistory } from 'react-router-dom';
import './Governance.css';
import '../index.css';
import PropTypes from 'prop-types';
import PieChart from './PieChart';

function Governance({ data }) {
  const history = useHistory();

  return (
    <div className="GovernanceGraph">
      <h1>Governance Layer</h1>
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

Governance.propTypes = {
  data: PropTypes.string,
};
Governance.defaultProps = { data: '' };

export default Governance;
