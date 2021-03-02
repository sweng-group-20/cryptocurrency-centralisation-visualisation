import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = ({ className, children, onClick }) => (
  <button
    className={classnames(
      'text-white',
      'px-4',
      'py-2',
      'rounded-md',
      'bg-blue-700',
      'hover:bg-opacity-80',
      'focus:ring-offset-2',
      'focus:ring-2',
      'focus:ring-blue-700',
      className
    )}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  onClick: () => {},
};

export default Button;
