import './App.css';
import React from 'react';
import Hero from './Pages/Hero';
import About from './Pages/About';
import Graphs from './Pages/GraphArea';

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
