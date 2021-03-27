import React from 'react';
import { useHistory } from 'react-router-dom';
import './Governance.css';
import '../index.css';

function Governance() {
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
    </div>
  );
}

export default Governance;
