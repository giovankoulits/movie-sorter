import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MoviesContextReducer from './components/MoviesContextReducer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MoviesContextReducer>
    <App />
  </MoviesContextReducer>
);
