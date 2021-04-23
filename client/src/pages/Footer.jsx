import React from 'react';
import './Footer.css';
import '../index.css';

function Footer() {
  return (
    <section className="Footer">
      <div className="foot">
        Sai, Ashish Rajendra, Jim Buckley, Brian Fitzgerald, and Andrew Le Gear.
        &quot;
        <a href="https://www.sciencedirect.com/science/article/pii/S0306457321000844">
          Taxonomy of centralization in public blockchain systems: A systematic
          literature review
        </a>
        .&quot; <i>Information Processing &amp; Management</i> 58, no. 4 (2021):
        102584.
      </div>
      <div className="credits">
        <a href="https://github.com/lexesjan">Lexes Jan Mantiquilla</a>
        <a href="https://github.com/Juuiko">Alex Robert Mahon</a>
        <a href="https://github.com/leonawolff">Leona Wolff</a>
        <a href="https://github.com/timotheekelly">Timothee Kelly</a>
        <a href="https://github.com/SteDavis20">Stephen Davis</a>
        <a href="https://github.com/aodhanocathain">Aodhán Keane</a>
      </div>
    </section>
  );
}

export default Footer;
