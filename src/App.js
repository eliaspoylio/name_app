import React, { useEffect, useState, useCallback } from 'react';

import logo from './logo.svg';
import './App.css';

function getAll() {
  return fetch('http://localhost:2020/api/all')
    .then(data => data.json())
}



function App() {
  const [allNames, setAllNames] = useState({ names: [] });
  const [namesToShow, setNamesToShow] = useState([]);
  const [order, setOrder] = useState('byAmount');
  var Works = () => <namesToShow onClick={displayWork} />;

  console.log(namesToShow)

  useEffect(() => {
    let mounted = true;
    getAll()
      .then(names => {
        if (mounted) {
          setAllNames(names)
          setNamesToShow(names.names)
        }
      })
    return () => mounted = false;
  }, [])

  const displayWork = useCallback((event, { order }) => {
    if (order === 'byName') {
      const byName = namesToShow.sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.name > b.name) ? 1 : -1) : -1)
      setNamesToShow(byName)
    }
    else {
      const byAmount = namesToShow.sort((a, b) => (a.amount > b.amount) ? 1 : (a.amount === b.amount) ? ((a.amount > b.amount) ? 1 : -1) : -1)
      byAmount.reverse()
      setNamesToShow(byAmount)
    }
  }, []);






  /*
  const byAmount = allNames.names.sort((a, b) => (a.amount > b.amount) ? 1 : (a.amount === b.amount) ? ((a.amount > b.amount) ? 1 : -1) : -1)
  byAmount.reverse()
  setNamesToShow(byAmount)
  
  const byName = allNames.names.sort((a, b) => (a.name > b.name) ? 1 : (a.name === b.name) ? ((a.name > b.name) ? 1 : -1) : -1)
  setNamesToShow(byName)
  */


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <button onClick={() => setOrder('byAmount')}>byAmount</button>
      <button onClick={() => setOrder('byName')}>byName</button>
      <h1>All names and amounts</h1>
      <ul>
        {namesToShow.map(name => <li key={name.name}>{name.name}: {name.amount}</li>)}
      </ul>
    </div>
  );
}

/**
 *       <button onClick={byAmount(allNames.names)}>By amount</button>
      <button onClick={byName(allNames.names)}>By name</button>
        <ul>
        {allNames.names.map(name => <li key={name.name}>{name.name}: {name.amount}</li>)}
        </ul>

 */

export default App;