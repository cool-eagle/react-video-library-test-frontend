import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import AddVideo from './pages/AddVideo';
import Core from './container/core';
import UpdateVideo from './pages/UpdateVideo';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add' element={<AddVideo />} />
        <Route path='/update' element={<UpdateVideo />} />
      </Routes>
      <Core />
    </BrowserRouter>
  );
}

export default App;
