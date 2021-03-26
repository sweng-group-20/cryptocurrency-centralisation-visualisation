import React from 'react';
import './App.css';
import Hero from './Pages/Hero';
import About from './Pages/About';
import Graphs from './Pages/GraphArea';
import ScrollArrow from './components/ScrollArrow';

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <Graphs />
      <ScrollArrow />
    </div>
  );
}

export default App;
