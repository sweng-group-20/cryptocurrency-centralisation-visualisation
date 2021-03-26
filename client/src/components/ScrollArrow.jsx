import React, { useState, useEffect } from 'react';
import './ScrollArrow.css';
import '../index.css';
import Arrow from './images/arrow.png';

function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 1000) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const scrollToTop = () => {
    window.scrollBy(window.scrollBy(0, 650));
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button type="button" onClick={scrollToTop}>
      {isVisible && <img className="ScrollArrow" src={Arrow} alt="Go to top" />}
    </button>
  );
}

export default ScrollArrow;
