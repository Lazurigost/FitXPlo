import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./components/Pages/Todo/Todo";
import FavoriteList from "./components/Pages/Todo/FavoriteList"
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <Router>
          <Routes>
            <Route path="/" element={<Todo />} />
                      <Route path="/profile" element={<Todo />} />
                      <Route path="favorites" element={<FavoriteList /> }/>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
