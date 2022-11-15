# **Document for Project IS207: Web**

## **Cài đặt**

Cài đặt [Postman](https://www.postman.com/downloads/). Tất cả API nằm ở [đây](https://f4-koin.postman.co/workspace/Team-Workspace~f960be86-63d3-4800-85fe-1f3f473bac31/collection/21421644-36348ca2-9dd0-4788-b3c0-396a7bbe23fb?action=share&creator=23833583)

Cài đặt môi trường [NodeJS](https://nodejs.org/en/download/)

Kéo project từ Github về và chạy lệnh 

```
npm install
```

để cài đặt các package cần thiết

Dùng lệnh 

```
npm start
```

để chạy code và test

## **Thư mục Project**


- ***node_modules*** : Thư mục để chứa tất cả package cần thiết **(TUYỆT ĐỐI KHÔNG ĐỤNG VÀO)** 

- ***public*** : Thư mục chứa file html duy nhất và các resource để hỗ trợ ***chỉ riêng cho file html***

  > Lưu ý: File html không nên viết code vào, chỉ trừ việc thêm thư viện hoặc cdn

- ***src*** : Thư mục chứa các file

- ***.gitignore***: File liệt kê những file/đuôi file không được push lên git (nên đọc để biết hỗ trợ cho BackEnd)

- ***package-lock.json và package.json***: File liệt kê những package được sử dụng, script, ...

## **Coding** 


Code trong thư mục ***src***. HTML được viết trong file JS, cách viết đọc trong [Document của React](https://reactjs.org/docs/getting-started.html)

> Lưu ý các file `.js` và `.css` phải đặt trong ***src*** thì project mới chạy

Ví dụ 

```
return (
      <>
        <div className='h-100'>
          <img src={item.imageUrl} alt="" className='' />
          <p className='fs-4 my-3 text-uppercase fw-semibold'>{item.productName}</p>
          <p className='fs-4 text-light'>${item.productPrice}</p>
        </div>
      </>
    )
``` 

CSS cho các element trong HTML: Viết bằng BOOTSTRAP

> Mục đích là để dễ dàng bảo trì và sửa code nếu UI lỗi, người sau đọc vào không cần phải tìm tag sau đó dò trong file css và thử từng dòng css để biết lỗi

CSS (nếu có) thì viết trong file .css như bình thường

## **Teck Stack**

#### [ReactJS](https://reactjs.org/docs/getting-started.html)

> Giải thích nhanh: Viết HTML trong ReactJS tiện hơn so với bình thường, ReactJS cũng dễ Render giao diện và xử lý data hơn bình thường

Cần nắm một chút các React Hooks như `useState()` và `useEffect()` các Hooks còn lại có thể tìm hiểu sau

Nên tìm hiểu thêm những cú pháp của Javascript ES6

#### [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/) (thư viện CSS)

> Giải thích nhanh: Bootstrap tích hợp các thuộc tính CSS vào trong các class, với việc căn chỉnh đã được thực hiện sẵn, nên khi CSS chỉ cần gọi tên class là được

Code mẫu: 

```
<button type="button" class="btn btn-dark fs-2 w-100 btn-redirect">Koi Fish</button>
```

Đoạn code trên sử dụng các class `btn` `btn-dark` `fs-2` `w-100` thuộc thư viện Bootstrap để lần lượt: Tạo kiểu dáng cho button, tạo màu cho button, định font chữ cho button (font-size mức 2), chiều ngang 100% (Đọc document để biết rõ hơn) 
#### [Axios](https://www.npmjs.com/package/axios) (thư viện dùng để tạo request lấy API)

> Giải thích nhanh: Axios dễ dùng hơn so với dùng hàm fetch cơ bản của Javascript.

Code mẫu: 

```
let response = await axios('https://backend.f4koin.cyou/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: username,
          password: password
        }
      }).then(res => { 
        //some code
      })
```

Đoạn code trên giúp tạo request post đến API login của server, axios giúp cú pháp khai báo các Header của request ngắn và đơn giản hơn. 

Dễ thấy trên ví dụ các param truyền vào dưới dạng 1 object có các key là method, headers, data, ... . Các key có thể thay đổi tùy thuộc vào mục đích sử dụng

Ở trên request post cần có `header` chứa `Content-Type: 'application/json'` do yêu cầu của Server và `data` gồm `username` và `password`

Tham khảo request Get từ các file khác trong Project

#### [React Router Dom](https://reactrouter.com/en/main) (thư viện để tạo Router chuyển hướng trang)

> Giải thích nhanh: React Router Dom giúp tạo đường dẫn chuyển trang nhanh mà tốn ít dòng code hơn so với Javascript thuần. Thường sẽ đặt các Route này trong file `index.js`

Code mẫu 

```
<Route path="/" element={<IntroHeader />}>
```

Khi người dùng nhập URL, giả sử: `example.com/` lên trình duyệt, lúc này đoạn code trên sẽ được thực thi và gọi tới file `IntroHeader.js` để render ra View 