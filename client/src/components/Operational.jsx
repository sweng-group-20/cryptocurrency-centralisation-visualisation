import React from 'react';
import { useHistory } from 'react-router-dom';
import './Operational.css';
import '../index.css';

function Operational() {
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
    </div>
  );
}

export default Operational;
