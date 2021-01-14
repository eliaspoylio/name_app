import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function getAll() {
  return fetch('http://localhost:2020/api/all')
    .then(data => data.json())
}

function getName(name) {
  return fetch('http://localhost:2020/api/' + name)
    .then(data => data.json())
}

function ChangeOrder({ data, orderBy }) {
  useEffect(() => {
    console.log("order changed to", orderBy);
  }, [orderBy]);

  if (orderBy === 'Name') {
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
  const [namesToShow, setNamesToShow] = useState([])
  const [order, setOrder] = useState()
  const [search, setSearch] = useState('');
  const [searchedName, setSearchedName] = useState([]);
  const [sum, setSum] = useState([]);

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

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setSum(namesToShow.map(name => name.amount).reduce((acc, name) => name + acc));
    }
  }, [namesToShow])

  const handleSubmit = (e) => {
    e.preventDefault()
    let mounted = true
    getName(search)
      .then(name => {
        if (mounted) {
          setSearchedName(name)
        }
      })
    console.log(searchedName)
    return () => mounted = false
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          This page displays data fetched from API.
        </p>
        <p>
          The app makes the `/api/all` -request when loaded and then calculates the amount of all the people presented in the response data. The user can toggle the order in which the data is presented. There's also a form and the user can search a specific name with the `/api/:name` -request from the form.
        </p>
      </header>
      <div className="App-container">
        <div className="App-item">
          <form onSubmit={handleSubmit}>
            <label>
              <p>Search by name</p>
              <input type="text" onChange={event => setSearch(event.target.value)} value={search} />
            </label>
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="App-item">
          <p>{searchedName.name}, {searchedName.amount}</p>
        </div>
        <div className="App-item">
          <p>Sum of all the names</p>
        </div>
        <div className="App-item">
          <p>{sum}</p>
        </div>
        <div className="App-item">
          <button onClick={() => setOrder('Name')}>By Name</button>
          <button onClick={() => setOrder('Amount')}>By Amount</button>
        </div>
        <div className="App-item">
          <p>Names by {order}</p>
          <ChangeOrder data={namesToShow} orderBy={order} />
        </div>
      </div>
      <div className="App-footer">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Made with React</p>
      </div>
    </div>
  );
}

export default App;