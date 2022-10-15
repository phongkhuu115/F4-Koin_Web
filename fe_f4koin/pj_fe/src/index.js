import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header';
import Body from './Body'
import RenderLogin from './Login';
import RenderSignup from './Signup'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const htmlRoot = document.getElementById('root');
htmlRoot.classList.add("h-100")
const root = ReactDOM.createRoot(htmlRoot);
root.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Body></Body>}></Route>
        <Route path='/login' element={ <RenderLogin></RenderLogin>}></Route>
        <Route path='/signup' element={ <RenderSignup></RenderSignup>}></Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

