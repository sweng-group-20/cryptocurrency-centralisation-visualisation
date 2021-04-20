import React from 'react';
import './App.css';
import Hero from './pages/Hero';
import About from './pages/About';
import Graphs from './pages/GraphArea';
import ScrollArrow from './components/ScrollArrow';

function App() {
  console.log(process.env.REACT_APP_API_HOST);
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
