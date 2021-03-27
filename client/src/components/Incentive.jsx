import React from 'react';
import { useHistory } from 'react-router-dom';
import './Incentive.css';
import '../index.css';

function Insentive() {
  const history = useHistory();

  return (
    <div className="IncentiveGraph">
      <h1>Insentive Layer</h1>
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

export default Insentive;
