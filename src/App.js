import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';

function getAll() {
  return fetch('http://localhost:2020/api/all')
    .then(data => data.json())
}

function App() {
  const [allNames, setAllNames] = useState([]);

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

  console.log(Object.values(allNames))
  
  const byAmount = Object.values(allNames).sort((a, b) => (a.amount > b.amount) ? 1 : (a.amount === b.amount) ? ((a.amount > b.amount) ? 1 : -1) : -1 )
  byAmount.reverse()
  console.log(byAmount)

  const byName = Object.values(allNames).sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.name > b.name) ? 1 : -1) : -1 )
  console.log(byName)

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
      <h1>All names and amounts</h1>
        <ul>
        {Object.values(allNames).map(name => <li key={name.name}>{name.name}: {name.amount}</li>)}
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
