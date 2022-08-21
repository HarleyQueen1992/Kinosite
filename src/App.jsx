import React, { useState } from 'react'
import s from './App.module.css'
import Movies from './Components/Movies/Movies'
import Header from './Components/Header/Header'
import { Routes, Route } from "react-router-dom";

function App() {
  const [keyWord, setKeyWord] = useState('');
  const [curruntPage, setCurrentPage] = useState(1);

  return (
    <div className={s.app} >
      <Header keyWord={keyWord} setCurrentPage={setCurrentPage} setKeyWord={setKeyWord}/>
      <Routes>
          <Route path='/films/' element={<Movies keyWord={keyWord}  curruntPage={curruntPage} setCurrentPage={setCurrentPage}/>} />
      </Routes>
      
    </div>
  ); 
}

export default App;
