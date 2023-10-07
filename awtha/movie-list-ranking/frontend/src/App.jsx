import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PageH from "./Components/PageHeader";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Lists from "./Components/Lists";
import Rank from "./Components/Rank";
import CreateList from "./Components/CreateList";

const server_url = 'http://10.0.0.209:11037';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [lists, setLists] = useState([]);
  const [resetMovies, setReset] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"searchValue": searchValue})
    }
    
    const response = await fetch(server_url + '/query/movies', options);

    const res = await response.json();

    console.log(res);
    
    if (res.Search) {
      setMovies(res.Search);
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    // Define an async function to fetch the lists
    const fetchLists = async () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const response = await fetch(server_url + '/lists', options);
            const data = await response.json();
            setLists(data); // Update the state with the fetched lists
        } catch (error) {
            console.error('Error fetching lists:', error);
        }
    };

    // Call the fetchLists function to fetch the lists
    fetchLists();
}, [resetMovies]);


  return (
    <BrowserRouter>
      <div className="App">
        <PageH heading="Rankd" searchValue={searchValue} setSearchValue={setSearchValue}/>

        <div className="belowHead">
          <div className="pagesetup"></div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/create-list' element={<CreateList setReset={setReset}/>} />
            <Route path='/lists' element={<Lists movies={movies} lists={lists} />} />
            {lists.map((list, index)=> (
                <Route key={index} path={'/lists/' + list.title} element={<Rank movies={movies} list={list} searchValue={searchValue} setSearchValue={setSearchValue} reset={resetMovies} setReset={setReset}/>} />
            ))}
          </Routes>
          <div className="pagesetup"></div>
        </div>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
