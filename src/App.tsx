import './App.css';
import React from 'react';
import Home from './components/home/home.component';
import Header from './components/header/header.component';

const App: React.FC<any> = () => {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;