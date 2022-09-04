import React, { useEffect, useState } from 'react'
import s from './App.module.css'
import Movies from './Components/Movies/Movies'
import Header from './Components/Header/Header'
import MovieInformation from './Components/MovieInformation/MovieInformation'
import { Routes, Route } from "react-router-dom";
import PageNotFound from './Components/PageNotFound/PageNotFound'

function App() {  
  const [keyWord, setKeyWord] = useState('');
  const [curruntPage, setCurrentPage] = useState(1);

  const startUrl = window.location.pathname + (window.location.hash).substring(0, 2)
  if (startUrl !== "/Kinosite/#/" || !((window.location.hash).substring(2, 3))){
      window.location = "/Kinosite/#/films/";
  }

  return (
  <div className={s.app} >
    <Header keyWord={keyWord} setCurrentPage={setCurrentPage} setKeyWord={setKeyWord}/>
    <Routes>
        <Route path='/films/' element={<Movies keyWord={keyWord}  curruntPage={curruntPage} setCurrentPage={setCurrentPage}/>} />
        <Route path='/film/:id' element={<MovieInformation/>}/> 
        <Route path='*' element={<PageNotFound />} />
    </Routes>
    
  </div>
  ); 
}

export default App;
