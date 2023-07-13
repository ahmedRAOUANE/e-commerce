import React from "react";
// css styles
import './assets/App.css';

//  components
import Header from "./components/header/Header";
import Mainbody from "./components/main/Mainbody";

function App() {
  return (
    <div className="App">
      <Header />
      <Mainbody />
    </div>
  );
}

export default App;
