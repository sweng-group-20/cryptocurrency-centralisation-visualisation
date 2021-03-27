import React from 'react';
import { useHistory } from 'react-router-dom';
import './Application.css';
import '../index.css';

function Application() {
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
    </div>
  );
}

export default Application;
