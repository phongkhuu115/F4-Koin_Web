import './Signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainPic from './koi.png';


function RenderSignup() {
  return (
    <div className="Main container-fluid h-100 position-relative">
      <form action="" className='position-absolute'>
        <h1 className='fw-bold mb-5'>Create Account</h1>
        <div className="input-container d-flex justify-content-between">
          <div className="half">
            <label htmlFor="username" className='fs-3 mb-2'>Username: </label>
            <input type="text" name="username" id="username" className="form-control fs-4 p-4 mb-3" placeholder='erik115'/>
            <label htmlFor="email" className='fs-3 mb-2'>Email: </label>
            <input type="email" name="email" id="email" className="form-control fs-4 p-4 mb-3" placeholder='eric115@gmail.com'/>
            <label htmlFor="password" className='fs-3 mb-2'>Username: </label>
            <input type="password" name="password" id="password" className="form-control fs-4 p-4 mb-3" placeholder='•••••••••••••••••'/>
          </div>
          <div className="half">
            <label htmlFor="fullName" className='fs-3 mb-2'>Full Name: </label>
            <input type="text" name="fullName" id="fullName" className="form-control fs-4 p-4 mb-3" placeholder='Eric Sanders'/>
            <label htmlFor="phoneNumber" className='fs-3 mb-2'>Phone Number: </label>
            <input type="text" name="phoneNumber" id="phoneNumber" className="form-control fs-4 p-4 mb-3" placeholder='0123456789'/>
            <label htmlFor="confirm-pass" className='fs-3 mb-2'>Confirm Password: </label>
            <input type="text" name="confirm-pass" id="confirm-pass" className="form-control fs-4 p-4 mb-3" placeholder='•••••••••••••••••'/>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className='signup-button text-uppercase fw-bold fs-3 rounded-2'>Create Account</button>
          <button type="submit" className='signup-button text-uppercase fw-bold fs-3 rounded-2'><i class="fa-brands fa-google"></i> Sign in with Google</button>
        </div>
      </form>
      <img src={mainPic} className="main-pic h-75 position-absolute top-50 translate-middle" alt="" />
    </div>
  );
}

export default RenderSignup;