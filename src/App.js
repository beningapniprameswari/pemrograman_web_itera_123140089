import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1>Manajemen Buku Pribadi</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stats">Statistik</Link>
          </li>
        </ul>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;