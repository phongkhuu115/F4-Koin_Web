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
import DashBoard from './components/admin/Dashboard';
import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter
} from "react-router-dom";
import FishesAdmin from './components/admin/FishesAdmin';
import ProductsAdmin from './components/admin/ProductsAdmin';
import UsersAdmin from './components/admin/UsersAdmin'
import Chat from './components/chat/ChatView'
import UserChat from './components/chat/UserChatView'
import UserInfo from './components/UserInfo';

const htmlRoot = document.getElementById('root');
window.addEventListener("beforeunload", () => {
  localStorage.removeItem('isLogin')
});
htmlRoot.classList.add("h-100")
const root = ReactDOM.createRoot(htmlRoot);
root.render(
  <HashRouter>
    <Routes>
      <Route exact path="/" element={<IntroHeader />}>
        <Route index element={<Body />} />
        <Route exact path="login" element={<RenderLogin />} />
        <Route exact path="signup" element={<RenderSignup />} />
      </Route>
      <Route exact path="/about-us" element={<AboutUs />} />
      <Route path="/home" element={<><ShopHeader /><ShopFooter /></>}>
        <Route index element={<HomePage />} />
        <Route exact path="shop" element={<FishShop />} />
        <Route exact path='payment' element={<Payment></Payment>} />
        <Route exact path='product' element={<Product></Product>} />
        <Route exact path='cart' element={<Cart></Cart>} />
        <Route exact path = 'userchat' element={<UserChat></UserChat>}></Route>
        <Route exact path = 'info' element={<UserInfo></UserInfo>}></Route>
      </Route>
      <Route path='/admin'>
        <Route index element={ <DashBoard></DashBoard>}></Route>
        <Route exact path='fish' element={<FishesAdmin></FishesAdmin>} />
        <Route exact path='products' element={<ProductsAdmin></ProductsAdmin>} />
        <Route exact path='users' element={<UsersAdmin></UsersAdmin>} />
        <Route exact path = 'chat' element={<Chat></Chat>}></Route>
      </Route>
    </Routes>
  </HashRouter>
);

