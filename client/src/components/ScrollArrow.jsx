import React, { useState, useEffect } from 'react';

import Arrow from './images/arrow.png';
import './ScrollArrow.css';
import '../index.css';

function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(true);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 1000) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const scrollToTop = () => {
    const pageHeight = window.innerHeight;
    window.scrollBy(window.scrollBy(0, pageHeight));
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button className="arrow" type="button" onClick={scrollToTop}>
      {isVisible && <img className="ScrollArrow" src={Arrow} alt="Go to top" />}
    </button>
  );
}

export default ScrollArrow;
