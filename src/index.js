import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Body from './components/Body'
import RenderLogin from './components/Login';
import RenderSignup from './components/Signup'
import HomePage from './components/Home';
import ShopHeader from './components/ShopHeader';
import IntroHeader from './components/IntroHeader';
import ShopFooter from './components/ShopFooter';
import FishShop from './components/FishShop';
import Payment from './components/Payment'
import Product from './components/Product';
import Cart from './components/Cart'
import AboutUs from './components/AboutUs'
import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter
} from "react-router-dom";

const htmlRoot = document.getElementById('root');
window.addEventListener("beforeunload", () => 
{  
    localStorage.removeItem('isLogin')
});
htmlRoot.classList.add("h-100")
const root = ReactDOM.createRoot(htmlRoot);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<IntroHeader />}>
        <Route index element={<Body />} />
        <Route exact path="login" element={<RenderLogin />} />
        <Route exact path="signup" element={<RenderSignup />} />
        <Route exact path="about-us" element={<AboutUs />} />
      </Route>
      <Route path="/home" element={<><ShopHeader /><ShopFooter /></>}>
        <Route index element={<HomePage />} />
        <Route exact path="shop" element={<FishShop />} />
        <Route exact path='payment' element={<Payment></Payment>} />
        <Route exact path='product' element={<Product></Product>} />
        <Route exact path='cart' element= {<Cart></Cart>}/>
      </Route>
    </Routes>
  </HashRouter>
);

