import './App.css';
import React from 'react';
import Hero from './pages/Hero';
import About from './pages/About';
import Graphs from './pages/GraphArea';

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <Graphs />
    </div>
  );
}

export default App;
