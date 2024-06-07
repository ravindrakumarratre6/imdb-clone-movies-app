import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MovieList from "./components/MoviesList/MovieList";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<h1>Error Page</h1>} />
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="movies/:type" element={<MovieList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
