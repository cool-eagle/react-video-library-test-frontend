import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddVideo from "./pages/AddVideo";
import Core from "./container/core";
import UpdateVideo from "./pages/UpdateVideo";
import { useRecoilValue } from "recoil";
import { modalState } from "./atoms/modalAtom";
import Modal from "./components/Modal";

function App() {
  const showModal = useRecoilValue(modalState);

  return (
    <div className={`relative ${showModal && "!h-screen overflow-hidden"}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddVideo />} />
          <Route path="/update" element={<UpdateVideo />} />
        </Routes>
        <Core />
      </BrowserRouter>
      {showModal && <Modal />}
    </div>
  );
}

export default App;
