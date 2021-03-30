import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import PieChart from './PieChart';
import './Consensus.css';
import '../index.css';

function Consensus({ data }) {
  const history = useHistory();

  return (
    <div className="ConsensusGraph">
      <h1>Consensus Layer</h1>
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

Consensus.propTypes = {
  data: PropTypes.string,
};
Consensus.defaultProps = { data: '' };

export default Consensus;
