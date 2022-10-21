import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./FishShop.css";
function FishShop(props) {
  const [state, setState] = useState("");
  //create array random image link
  const testArrImg = [
    "https://picsum.photos/500/500?562",
    "https://picsum.photos/500/500?563",
    "https://picsum.photos/500/500?564",
    "https://picsum.photos/500/500?565",
  ];
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div>
        <h1 className="header-1 text-center font-bold display-1">KOI FISH</h1>
        <em className="em-2 d-flex justify-content-center">ALL KOI IN THE WOLRD &lt;3</em>
        
        <ul className="nav border-0">
          <li className="nav-item ">
            <a className="nav-link" href="#top">Home page </a> 
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#top"> Koi Fish</a>   
          </li>
        </ul>

        <h1 className="header-2 display-5 p-5">  KOI FISH<span className="number-item font-italic display-6">(number of fish)</span> </h1>
        <div className="drop-gr d-flex justify-content-between align-items-center p-3 border-solid border-top border-bottom">
          <div className="drop-main d-flex flex-row">
              <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle drop-item-btn" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                Gender </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#top">First Item</a>
                    <a className="dropdown-item" href="#top">Second Item</a>
                    <a className="dropdown-item" href="#top">Third Item</a>
                </div>
              </div>
              <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle drop-item-btn" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                Color </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#top">First Item</a>
                    <a className="dropdown-item" href="#top">Second Item</a>
                    <a className="dropdown-item" href="#top">Third Item</a>
                  </div>
              </div>
              <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle drop-item-btn" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                Size </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#top">First Item</a>
                    <a className="dropdown-item" href="#top">Second Item</a>
                    <a className="dropdown-item" href="#top">Third Item</a>
                  </div>
              </div>
              <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle drop-item-btn" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                  Price 
                </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#top">First Item</a>
                    <a className="dropdown-item" href="#top">Second Item</a>
                    <a className="dropdown-item" href="#top">Third Item</a>
                  </div>
              </div>        
          </div>
          <div className="drop-sub d-flex justify-content-between align-items-center">
              <ul className="list-group " >
                  <li className="list-group-item" ><span className="span-4">Sort By:</span></li>
              </ul>
              <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle drop-item-btn" aria-expanded="false" data-bs-toggle="dropdown" type="button" >
                Dropdown </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#top">First Item</a>
                    <a className="dropdown-item" href="#top">Second Item</a>
                    <a className="dropdown-item" href="#top">Third Item</a>
                  </div>
              </div>
          </div>
      </div>
      <div className="btn-category-group" role="group">
        <button className="btn btn-primary  btn-close-category" type="button">
          KOI FISH <i className="fa-solid fa-xmark"></i>
           <span className="span-category-close"> </span>
        </button>
        <a className="btn-category-group" href="#top">Clear all</a>
      </div>
        
    <div className="container d-flex flex-column align-items-center py-4 py-xl-5">
        <div className="row gy-4 row-cols-1 row-cols-md-4 w-100">

            <div className="col order-md-first">      
                    <div className="card">
                        <img className="card-img w-100 d-block" src = {testArrImg[0]}  alt=""/>
                    </div>
                    <div>
                        <h4 className="text-center" >Title</h4>
                        <p className="text-center">Volutpat habitasse risus posuere, commodo fusce donec. Turpis donec tristique.</p>
                    </div>
            </div>
            
            {/* Quăng hết mấy cái hình vô đây */}
            <div className="col order-md-first">      
                    <div className="card">
                        <img className="card-img w-100 d-block" src = {testArrImg[1]}  alt=""/>
                    </div>
                    <div>
                        <h4 className="text-center" >Title</h4>
                        <p className="text-center">Volutpat habitasse risus posuere, commodo fusce donec. Turpis donec tristique.</p>
                    </div>
            </div>
            <div className="col order-md-first">      
                    <div className="card">
                        <img className="card-img w-100 d-block" src = {testArrImg[2]}  alt=""/>
                    </div>
                    <div>
                        <h4 className="text-center" >Title</h4>
                        <p className="text-center">Volutpat habitasse risus posuere, commodo fusce donec. Turpis donec tristique.</p>
                    </div>
            </div>
            <div className="col order-md-first">      
                    <div className="card">
                        <img className="card-img w-100 d-block" src = {testArrImg[3]}  alt=""/>
                    </div>
                    <div>
                        <h4 className="text-center" >Title</h4>
                        <p className="text-center">Volutpat habitasse risus posuere, commodo fusce donec. Turpis donec tristique.</p>
                    </div>
            </div>
            
             {/*----------------------------- */}
            

        </div>
      </div>
        
        
        <div className="text-center page-nav d-flex justify-content-center align-items-center">
          <i className="fa fa-arrow-left btn-next"></i>
          <button className="btn btn-primary btn-page" type="button">1</button>
          <button className="btn btn-primary btn-page" type="button">2</button>
          <button className="btn btn-primary btn-page" type="button">3</button>
          <button className="btn btn-primary btn-page" type="button">4</button>
          <button className="btn btn-primary btn-page" type="button">...</button>
          <button className="btn btn-primary btn-page" type="button">7</button>
          <i className="fa fa-arrow-right btn-prev"></i>
      </div>    
      </div>  
    </>
  );
}

export default FishShop;
