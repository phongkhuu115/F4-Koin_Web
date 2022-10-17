import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ShopHeader from './ShopHeader';
import IntroHeader from './IntroHeader';
import Body from './Body'
import RenderLogin from './Login';
import RenderSignup from './Signup'
import HomePage from './Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const htmlRoot = document.getElementById('root');
htmlRoot.classList.add("h-100")
const root = ReactDOM.createRoot(htmlRoot);
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroHeader />}>
          <Route index element={<Body />} />
          <Route exact path="login" element={<RenderLogin />} />
          <Route exact path="signup" element={<RenderSignup />} />
        </Route>
        <Route path="/home" element={<ShopHeader />}>
          <Route index element={<HomePage />} />
          <Route exact path="login" element={<RenderLogin />} />
          <Route exact path="signup" element={<RenderSignup />} />
        </Route>
      </Routes>
    </BrowserRouter>
);

