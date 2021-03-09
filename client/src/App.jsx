import React from 'react';
import classnames from 'classnames';
import CounterPage from './pages/CounterPage';

const App = () => (
  <div className={classnames('font-sans')}>
    <CounterPage />
  </div>
);

export default App;
