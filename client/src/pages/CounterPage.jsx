import React, { useState } from 'react';
import classnames from 'classnames';
import Button from '../components/Button';

const CounterPage = () => {
  const [numClicks, setNumClicks] = useState(0);

  return (
    <div className={classnames('container', 'mx-auto', 'max-w-screen-lg')}>
      <div className={classnames('pt-10', 'pb-16', 'px-4', 'space-y-2')}>
        <div className={classnames('text-center', 'text-lg')}>
          You have clicked this button {numClicks} times
        </div>
        <div className={classnames('flex', 'justify-center')}>
          <Button onClick={() => setNumClicks((prev) => prev + 1)}>
            Click me!
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CounterPage;
