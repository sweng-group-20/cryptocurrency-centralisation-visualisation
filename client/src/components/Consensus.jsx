import React from 'react';
import { useHistory } from 'react-router-dom';
import './Consensus.css';
import '../index.css';

function Consensus() {
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
    </div>
  );
}

export default Consensus;
