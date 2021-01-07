import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';

function getAll() {
  return fetch('http://localhost:2020/api/all')
    .then(data => data.json())
}

function ChangeOrder({ data, orderBy }) {
  useEffect(() => {
    console.log("order changed to", orderBy);
  }, [orderBy]);

  if (orderBy === 'byName') {
    data.sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.name > b.name) ? 1 : -1) : -1)
  }
  else {
    data.sort((a, b) => (a.amount > b.amount) ? 1 : (a.amount === b.amount) ? ((a.amount > b.amount) ? 1 : -1) : -1)
    data.reverse()
  }
  return (
    <ul>
      {data.map(name => <li key={name.name}>{name.name}: {name.amount}</li>)}
    </ul>
  );
}



function App() {
  //const [allNames, setAllNames] = useState({ names: [] })
  const [namesToShow, setNamesToShow] = useState([])
  const [order, setOrder] = useState()

  useEffect(() => {
    let mounted = true
    getAll()
      .then(names => {
        if (mounted) {
          setNamesToShow(names.names)
        }
      })
    return () => mounted = false
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <button onClick={() => setOrder('byName')}>By Name</button>
      <button onClick={() => setOrder('byAmount')}>By Amount</button>
      <h1>All names and amounts</h1>
      <ChangeOrder data={namesToShow} orderBy={order} />
    </div>
  );
}


export default App;