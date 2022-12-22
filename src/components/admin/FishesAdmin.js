import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GetAPINoToken } from '../helpers/GlobalFunction';
import Item from './Item'
import { BaseURL, PostAPIToken } from '../helpers/GlobalFunction';
import { storage } from '../../components/helpers/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function ProductsAdmin(props) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNum, setPageNum] = useState(0);
  const [productNumber, setProductNumber] = useState(0);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const inputRef = useRef(null)
  let listID = [];

  function closeEditPopup() {
    const overlay = document.querySelector('.edit-popup')
    overlay.style.display = 'none'
  }

  function closeInsertPopup() {
    const overlay = document.querySelector('.insert-popup')
    overlay.style.display = 'none'
  }

  function handleAddFish() {
    const overlay = document.querySelector('.insert-popup')
    overlay.style.display = 'flex'
  }

  function selectAll(e) {
    let checkBoxs = document.querySelectorAll('.item-box')
    console.log(e)
    if (e === true) {
      for (let i = 0; i < checkBoxs.length; i++) {
        checkBoxs[i].checked = true;
      }
    }
    else {
      for (let i = 0; i < checkBoxs.length; i++) {
        checkBoxs[i].checked = false;
      }
    }
  }

  function handleDelete() {
    let url = BaseURL() + "deleteItem"
    let ids = ""
    // console.log(listID);
    let checkBoxs = document.querySelectorAll('.item-box')
    for (let i = 0; i < checkBoxs.length; i++) {
      if (checkBoxs[i].checked === true) {
        if (ids === "") {
          ids = listID[i];
        }
        else {
          ids = ids + "," + listID[i]
        }
      }
    }
    let body = {
      id: ids
    }
    console.log(ids)
    PostAPIToken(url, body).then(res => {
      console.log(res.data)
      if (res.data.message === "success") {
        window.location.reload();
      }
    })
  }


  useEffect(() => {
    let url = "https://backend.f4koin.cyou/api/getOnlyFish?page=" + currentPage;
    GetAPINoToken(url).then(res => {
      setPageNum(res.data.product.last_page);
      setMessage(res.data.message);
      if (Array.isArray(res.data.product.data)) {
        setItems(res.data.product.data.slice());
      }
      else {
        let array = Object.values(res.data.product.data);
        setItems(array.slice());
      }
      setProductNumber(res.data.product.total);
    })
  }, []);

  // const [id, setID] = useState('')
  // const [newName, setNewName] = useState('')
  // const [newName, setNewName] = useState('')
  // const [newName, setNewName] = useState('')
  // const [newName, setNewName] = useState('')
  // const [newName, setNewName] = useState('')
  // const [newName, setNewName] = useState('')

  function gotoPage(e) {
    if (e.keyCode === 13) {
      if (e.target.value > pageNum || e.target.value < 1) {
        return
      }
      let url = "https://backend.f4koin.cyou/api/getOnlyFish?page=" + e.target.value;
      GetAPINoToken(url).then(res => {
        setPageNum(res.data.product.last_page);
        setMessage(res.data.message);
        if (Array.isArray(res.data.product.data)) {
          setItems(res.data.product.data.slice());
        }
        else {
          let array = Object.values(res.data.product.data);
          setItems(array.slice());
        }
        setProductNumber(res.data.product.total);
      })
    }
  }

  function nextPage() {
    let value = Number(inputRef.current.value) + 1
    if (value > pageNum) {
      return
    }
    let url = "https://backend.f4koin.cyou/api/getOnlyFish?page=" + value;
    GetAPINoToken(url).then(res => {
      setPageNum(res.data.product.last_page);
      setMessage(res.data.message);
      if (Array.isArray(res.data.product.data)) {
        setItems(res.data.product.data.slice());
      }
      else {
        let array = Object.values(res.data.product.data);
        setItems(array.slice());
      }
      setProductNumber(res.data.product.total);
      inputRef.current.value = value
    })
  }

  function prevPage() {
    let value = Number(inputRef.current.value) - 1
    if (value < 1) {
      return
    }
    let url = "https://backend.f4koin.cyou/api/getOnlyFish?page=" + value;
    GetAPINoToken(url).then(res => {
      setPageNum(res.data.product.last_page);
      setMessage(res.data.message);
      if (Array.isArray(res.data.product.data)) {
        setItems(res.data.product.data.slice());
      }
      else {
        let array = Object.values(res.data.product.data);
        setItems(array.slice());
      }
      setProductNumber(res.data.product.total);
      inputRef.current.value = value
    })
  }

  function RenderCategory() {
    let categoryURL = BaseURL() + "getAllCategory"
    let [category, setCategory] = useState([]);
    useEffect(() => {
      GetAPINoToken(categoryURL).then(res => {
        setCategory(res.data.category.slice());
      })
    }, [])
    return category.map(item => {
      return (
        <option key={item.categoryID} value={item.categoryID}>{item.categoryName}</option>
      )
    })
  }

  const MemoCategory = useMemo(() => RenderCategory, [])


  const [fileUrl, setFileUrl] = useState('')
  function handleUpdate() {
    try {
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed",
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            let url = BaseURL() + "updateItem"
            let body = {
              productID: sessionStorage.getItem('edit_prod'),
              productName: productName,
              typeID: 1,
              productDetail: productDetail,
              productPrice: productPrice,
              productSize: productSize,
              productCategoryID: productCategoryID,
              productInventory: productInventory,
              productSex: productSex,
              productDiscount: productDiscount,
              imageUrl: downloadURL
            }
            PostAPIToken(url, body).then(res => {
              if (res.data.message === 'success') {
                window.location.reload();
              }
            })
          });
        }
      );
    }
    catch (error) {
      let url = BaseURL() + "updateItem"
      let body = {
        productID: sessionStorage.getItem('edit_prod'),
        productName: productName,
        typeID: 1,
        productDetail: productDetail,
        productPrice: productPrice,
        productSize: productSize,
        productCategoryID: productCategoryID,
        productInventory: productInventory,
        productSex: productSex,
        productDiscount: productDiscount,
        imageUrl: ''
      }
      console.log(body)
      PostAPIToken(url, body).then(res => {
        console.log(res.data)
        if (res.data.message === 'success') {
          window.location.reload();
        }
      })
    }
  }

  // Insert Vars

  const [productName, setProductName] = useState();
  const [typeID, setTypeID] = useState();
  const [productDetail, setProductDetail] = useState();
  const [productSize, setProductSize] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productCategoryID, setProductCategoryID] = useState('2d9fa7fb-72e2-f615-35ac-9d9d25c8c7ab');
  const [productInventory, setProductInventory] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productSex, setProductSex] = useState();

  function insertNewFish(type) {
    // console.log('click')
    // console.log(file);

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let url = BaseURL() + "insertItem"
          let body = {
            productName: productName,
            typeID: type,
            productDetail: productDetail,
            productPrice: productPrice,
            productSize: productSize,
            productCategoryID: productCategoryID,
            productInventory: productInventory,
            productSex: productSex,
            productDiscount: productDiscount,
            imageUrl: downloadURL
          }
          PostAPIToken(url, body).then(res => {
            console.log(res.data)
            if (res.data.message === 'Product created successfully') {
              
            }
          })
        });
      }
    );
  }

  return (
    <>
      <div className='d-flex bg-white justify-content-between align-items-center'>
        <p className='mb-0 p-4 fw-bold text-danger'>F4 Koin</p>
      </div>
      <p className='m-5'>Sản phẩm</p>
      <div className='bg-white m-5 rounded-1 p-4 container-fluid'>
        <div onClick={handleAddFish} className='btn btn-primary fs-3'>Thêm Sản Phẩm</div>
        <div onClick={handleDelete} className='ms-3 btn btn-danger fs-3'>Xóa Sản Phẩm</div>
        <div className='d-flex align-items-center mt-4 border-bottom border-top'>
          <input onClick={(e) => selectAll(e.target.checked)} type="checkbox" name="main-checkbox" id="main-checkbox" className='me-5' />
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Tên</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Giống</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Số lượng</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>Kích thước</p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col text-center'>
            Giá
          </p>
          <p className='text-muted fs-2 fw-semibold mb-0 product__col-status text-center'>Tình trạng</p>
          <p className='text-muted fs-2 fw-semibold mb-0'>&ensp;</p>
        </div>
        {items.map(item => {
          listID.push(item.productID)
          console.log(item.productID)
          return (
            <Item id={item.productID} name={item.productName} sex={item.productSex} size={item.productSize} quantity={item.productInventory} status={item.productInventory > 0 ? "Còn hàng" : "Hết hàng"} price={item.productPrice}></Item>
          )
        })}
        <div className='d-flex align-items-center justify-content-center mt-4'>
          <i className="fa fa-arrow-left btn-next fs-2 me-3" onClick={prevPage}></i>
          <input onKeyDown={e => gotoPage(e)} ref={inputRef} type="text" name="" id="page__number" defaultValue={1} className='fs-3 text-center' />
          <i className="fa fa-arrow-right btn-prev fs-2 ms-3" onClick={nextPage}></i>
        </div>
      </div>
      {/* Edit Fish */}
      <div className="edit-popup">
        <div className="bg-white rounded p-5 edit-section position-relative">
          <div className='close-btn p-3 fs-3' onClick={closeEditPopup}>
            <i class="fa-solid fa-xmark"></i>
          </div>
          <p className='my-5 text-center text-muted fs-2'>Cập nhật sản phẩm</p>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productName" className='fs-3 me-5 edit-label'>Tên</label>
            <input type="text" name="productName" id="productName" onChange={e => { setProductName(e.target.value) }} className='form-control fs-4' />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productSex" className='fs-3 me-5 edit-label'>Giống</label>
            <div className='d-flex align-items-center me-5'>
              <input type="radio" id="male" name="sex" value="Male" className='form-check-input fs-3 mt-0 me-2' onChange={e => { setProductSex(e.target.value) }} />
              <label for="male" className='fs-4'>Đực</label>
            </div>
            <div className="d-flex align-items-center">
              <input type="radio" id="female" name="sex" value="Female" className='form-check-input fs-3 mt-0 me-2' onChange={e => { setProductSex(e.target.value) }} />
              <label for="female" className='fs-4'>Cái</label>
            </div>
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="quantity" className='fs-3 me-5 edit-label'>Số lượng</label>
            <input type="text" name="quantity" id="quantity" className='form-control fs-4' onChange={e => { setProductInventory(e.target.value) }} />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productSize" className='fs-3 me-5 edit-label'>Kích thước</label>
            <input type="text" name="productSize" id="productSize" className='form-control fs-4' onChange={e => { setProductSize(e.target.value) }} />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productPrice" className='fs-3 me-5 edit-label'>Giá</label>
            <input type="text" name="productPrice" id="productPrice" className='form-control fs-4' onChange={e => { setProductPrice(e.target.value) }} />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productPrice" className='fs-3 me-5 edit-label'>Loại Cá</label>
            <select name="category" id="category" className='form-select fs-4' onChange={e => { setProductCategoryID(e.target.value) }}>
              <MemoCategory></MemoCategory>
            </select>
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="discount" className='fs-3 me-5 edit-label'>Giảm Giá</label>
            <input type="text" name="discount" id="discount" className='form-control fs-4' onChange={e => { setProductDiscount(e.target.value) }} />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productDetail" className='fs-3 me-5 edit-label'>Mô tả</label>
            <input type="text" name="productDetail" id="productDetail" className='form-control fs-4' onChange={e => { setProductDetail(e.target.value) }} />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productStatus" className='fs-3 me-5 edit-label'>Hình ảnh</label>
            <input type="file" name="productStatus" id="productStatus" className='form-control fs-2' onChange={e => setFile(e.target.files[0])} />
          </div>
          <div className='text-center'>
            <div className='btn btn-primary fs-3 mt-2' onClick={() => handleUpdate()}>
              Sửa
            </div>
          </div>
        </div>
      </div>
      {/* Insert Fish */}
      <div className="insert-popup">
        <div className="bg-white rounded p-5 edit-section position-relative">
          <div className='close-btn p-3 fs-3' onClick={closeInsertPopup}>
            <i class="fa-solid fa-xmark"></i>
          </div>
          <p className='my-5 text-center text-muted fs-2'>Thêm sản phẩm</p>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productName" className='fs-3 me-5 edit-label'>Tên</label>
            <input type="text" name="productName" id="productName" onChange={e => { setProductName(e.target.value) }} className='form-control fs-4' />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productSex" className='fs-3 me-5 edit-label'>Giống</label>
            <div className='d-flex align-items-center me-5'>
              <input type="radio" id="male" name="sex" value="Male" className='form-check-input fs-3 mt-0 me-2' onChange={e => { setProductSex(e.target.value) }} />
              <label for="male" className='fs-4'>Đực</label>
            </div>
            <div className="d-flex align-items-center">
              <input type="radio" id="female" name="sex" value="Female" className='form-check-input fs-3 mt-0 me-2' onChange={e => { setProductSex(e.target.value) }} />
              <label for="female" className='fs-4'>Cái</label>
            </div>
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="quantity" className='fs-3 me-5 edit-label'>Số lượng</label>
            <input type="text" name="quantity" id="quantity" className='form-control fs-4' onChange={e => { setProductInventory(e.target.value) }} />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productSize" className='fs-3 me-5 edit-label'>Kích thước</label>
            <input type="text" name="productSize" id="productSize" className='form-control fs-4' onChange={e => { setProductSize(e.target.value) }} />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productPrice" className='fs-3 me-5 edit-label'>Giá</label>
            <input type="text" name="productPrice" id="productPrice" className='form-control fs-4' onChange={e => { setProductPrice(e.target.value) }} />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productPrice" className='fs-3 me-5 edit-label'>Loại Cá</label>
            <select name="category" id="category" className='form-select fs-4' onChange={e => { setProductCategoryID(e.target.value) }}>
              <MemoCategory></MemoCategory>
            </select>
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="discount" className='fs-3 me-5 edit-label'>Giảm Giá</label>
            <input type="text" name="discount" id="discount" className='form-control fs-4' onChange={e => { setProductDiscount(e.target.value) }} />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productDetail" className='fs-3 me-5 edit-label'>Mô tả</label>
            <input type="text" name="productDetail" id="productDetail" className='form-control fs-4' onChange={e => { setProductDetail(e.target.value) }} />
          </div>
          <div className='d-flex align-items-center mb-4'>
            <label htmlFor="productStatus" className='fs-3 me-5 edit-label'>Hình ảnh</label>
            <input type="file" name="productStatus" id="productStatus" className='form-control fs-2' onChange={e => setFile(e.target.files[0])} />
          </div>
          <div className='text-center'>
            <div className='btn btn-primary fs-3 mt-2' onClick={() => insertNewFish(1)}>
              Thêm
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsAdmin;