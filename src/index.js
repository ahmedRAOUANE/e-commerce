import React from 'react';
import ReactDOM from 'react-dom/client';

// css styles
import './assets/index.css';
import './assets/normelize.css';
import './assets/bootstrap.min.css';

// components
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
