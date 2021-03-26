import React from 'react';
import './Application.css';
import '../index.css';
// import { useHistory } from 'react-router-dom';

function Application() {
  // const history = useHistory();

  return (
    <div className="ApplicationGraph">
      <h1>Application Layer</h1>
      {/* <button
        onClick={() => {
          history.goBack();
        }}
      >
        Go back
      </button> */}
    </div>
  );
}

export default Application;
