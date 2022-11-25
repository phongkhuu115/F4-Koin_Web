import '../styles/Body.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import webLogo from '../assets/weblogo.png'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import pk115 from '../assets/Pk115.svg'
import DevOpsLord from '../assets/N4ND.svg'
import n4t41 from '../assets/N4T41.svg'

function AboutUs() {
    return (
        <>

        

            <div className="bg-dark">
                <div className="container py-5">
                    <div className="row h-100 align-items-center py-5">
                        <div className="col-lg-6">
                            <h1 className="display-4 text-light">About us page</h1>
                            <p className="lead text-muted mb-0 display-4">F4 KOIN <br></br> IS207.N13<br></br> KOI SHOP WEBSITE</p>
                        </div>
                        <div className="col-lg-5 d-none d-lg-block mx-auto">
                            <img src={webLogo} width="460px" height="400px" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light py-5">
                <div className="container py-5">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6 order-2 order-lg-1">
                            {/* <i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i> */}
                            <h2 className="font-weight-light">KHƯU MINH PHONG</h2>
                            <p className="font-italic text-muted mb-4">Ông hoàng Framework, chúa tể frontend, kẻ huỷ diệt CTF</p>
                            <a href="https://www.facebook.com/profile.php?id=100012597317849" className="btn btn-dark px-5 rounded-pill lh-1 fs-3">Contact</a>
                        </div>
                        <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src={pk115} alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                    </div>
                </div>
            </div>

            <div className="bg-dark py-5">
                <div className="container py-5">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-5 px-5 mx-auto"><img src={DevOpsLord} alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                        <div className="col-lg-6">
                            {/* <i className="fa fa-leaf fa-2x mb-3 text-primary"></i> */}
                            <h2 className="font-weight-light text-light">NGUYỄN ĐÀM NHẬT ANH</h2>
                            <p className="font-italic text-muted mb-4">Ông hoàng Framework, chúa tể frontend, kẻ huỷ diệt CTF</p>
                            <a href="https://www.facebook.com/NDNAnh" className="btn btn-light px-5 rounded-pill lh-1 fs-3">Contact</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light py-5">
                <div className="container py-5">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6 order-2 order-lg-1">
                            {/* <i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i> */}
                            <h2 className="font-weight-light">NGUYỄN ANH TÀI</h2>
                            <p className="font-italic text-muted mb-4">Ông hoàng Framework, chúa tể frontend, kẻ huỷ diệt CTF</p>
                            <a href="https://www.facebook.com/profile.php?id=100012597317849" className="btn btn-dark px-5 rounded-pill lh-1 fs-3">Contact</a>
                        </div>
                        <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src={n4t41} alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                    </div>
                </div>
            </div>



        </>
    )
}
export default AboutUs;