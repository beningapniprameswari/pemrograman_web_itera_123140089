import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import App from './App';
import './index.css'; // Import file CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BookProvider>  {/* Bungkus App dengan Provider */}
        <App />
      </BookProvider>
    </BrowserRouter>
  </React.StrictMode>
);