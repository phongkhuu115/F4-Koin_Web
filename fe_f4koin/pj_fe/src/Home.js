import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function HomePage() {
  return (
    <>
      <div className='link-section d-flex h-100'>
        <div className="half w-50 m-5 d-flex">
          <button type="button" class="btn btn-dark fs-2 w-25 m-auto">Fish</button>
        </div>
        <div className="half w-50 m-5 d-flex">
          <button type="button" class="btn btn-light fs-2 w-25 m-auto">Tools & Foods</button>
        </div>
      </div>
      <div className='newProduct-section d-flex h-100'>
        
      </div>
    </>
  )
}

export default HomePage;