import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';

function getAll() {
  return fetch('http://localhost:2020/api/all')
    .then(data => data.json())
}

function byAmount(value) {
  return function() {
    console.log(value.sort((a, b) => (a.amount > b.amount) ? 1 : (a.amount === b.amount) ? ((a.amount > b.amount) ? 1 : -1) : -1 ))
  }
};

function byName(value) {
  return function() {
    console.log(value.sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.name > b.name) ? 1 : -1) : -1 ))
  }
};

function App() {
  const [allNames, setAllNames] = useState({names: []});

  useEffect(() => {
    let mounted = true;
    getAll()
      .then(names => {
        if(mounted) {
          setAllNames(names)          
        }
      })
    return () => mounted = false;
  }, [])


  //const byAmount = allNames.names.sort((a, b) => (a.amount > b.amount) ? 1 : (a.amount === b.amount) ? ((a.amount > b.amount) ? 1 : -1) : -1 )
  //byAmount.reverse()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      <button onClick={byAmount(allNames.names)}>By amount</button>
      <button onClick={byName(allNames.names)}>By name</button>
      <h1>All names and amounts</h1>
        <ul>
        {allNames.names.map(name => <li key={name.name}>{name.name}: {name.amount}</li>)}
        </ul>
    </div>
  );
}


/*
      <h1>All names and amounts</h1>
        <ul>
          {allNames.names.map(name => <li key={name.name}>{name.name}</li>)}
        </ul>

        {Object.keys(allNames).map(name => <li key={name}>{name.amount}</li>)}
*/
export default App;
