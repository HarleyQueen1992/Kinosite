import React, { useEffect, useState } from 'react'
import s from './App.module.css'
import Movies from './Components/Movies/Movies'
import Header from './Components/Header/Header'
import MovieInformation from './Components/MovieInformation/MovieInformation'
import { Routes, Route, Navigate } from "react-router-dom";
import Preloader from './Components/Preloader/Preloader'

function App() {  
  const [keyWord, setKeyWord] = useState('');
  const [curruntPage, setCurrentPage] = useState(1);
  const [isTreatment, setIsTreatment] = useState(true)
  
  const startUrl = window.location.pathname

  useEffect(() => {
    if (startUrl !== "/Kinosite/"){
      window.location = "/Kinosite/#/films/";
    }
    setIsTreatment(false)

  }, [])
  
  return (
      <div className={s.app} >
        <Header keyWord={keyWord} setCurrentPage={setCurrentPage} setKeyWord={setKeyWord}/>
        {isTreatment 
        ? <Preloader/>
        : <Routes>
            <Route path='/films/' element={<Movies keyWord={keyWord}  curruntPage={curruntPage} setCurrentPage={setCurrentPage}/>} />
            <Route path='/film/:id' element={<MovieInformation/>}/> 
            <Route  path="*"
                    element={<Navigate to="/films/" replace />} />
        </Routes>}
      </div>
  ); 
}

export default App;
