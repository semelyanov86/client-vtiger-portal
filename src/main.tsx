import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './sass/styles.scss';
// import './assets/css/styles.css';
// import './assets/css/main.css';
import './sass/styles.scss';

import './assets/img/background/background-blue.webp';
// import $ from 'jquery';
// import Popper from 'popper.js';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
