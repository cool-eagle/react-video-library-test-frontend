import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import AddVideo from './pages/AddVideo';

function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add' element={<AddVideo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
