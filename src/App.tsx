import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>contents</div>
    </BrowserRouter>
  );
}

export default App;
