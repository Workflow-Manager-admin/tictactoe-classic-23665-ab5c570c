import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

// Remove direct use of PUBLIC_URL if it exists; SafeGuard for all references
const PUBLIC_URL = process.env.PUBLIC_URL || "";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <a
              className="btn"
              style={{ textDecoration: 'none', color: 'white' }}
              href="https://github.com/kaviaai" target="_blank" rel="noopener noreferrer"
            >GitHub</a>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
          <h1 className="title" style={{ marginTop: 90, color: "#00adb5", fontSize: "2.2rem" }}>TicTacToe Classic</h1>
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;