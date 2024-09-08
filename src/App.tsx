import { ReactComponent as Logo} from './logo.svg';
import './App.css';
import React from 'react';
import Home from './components/home/home.component';

const App: React.FC<any> = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Home />
    </div>
  );
}

export default App;