import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ShopHeader from './ShopHeader';
import IntroHeader from './IntroHeader';
import Body from './Body'
import RenderLogin from './Login';
import RenderSignup from './Signup'
import HomePage from './Home';
import ShopFooter from './ShopFooter';
import FishShop from './FishShop';
import Payment from './Payment'
import Bank from './BankPayment';
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
      <Route path="/home" element={<><ShopHeader /><ShopFooter></ShopFooter></>}>
        <Route index element={<HomePage />} />
        <Route exact path="shop" element={<FishShop />} />
        <Route exact path='payment' element={ <Payment></Payment>}>
          <Route exact path='bank' element={ <Bank></Bank>}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

