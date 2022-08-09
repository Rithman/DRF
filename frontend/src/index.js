import React from 'react';
import ReactDOM from 'react-dom';
import App, { Footer, Menu } from './App';
import './index.css';

ReactDOM.render(
  [<Menu />, <App />, <Footer />],
  document.getElementById('root')
);
