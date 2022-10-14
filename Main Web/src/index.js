import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header';
import Body from './Body'

const htmlRoot = document.getElementById('root');
htmlRoot.classList.add("h-100")
const root = ReactDOM.createRoot(htmlRoot);
root.render(
  <React.StrictMode>
    <Header />
    <></>
    <Body></Body>
  </React.StrictMode>
);

