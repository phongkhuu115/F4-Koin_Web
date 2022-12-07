import axios from "axios";

/**
 * Hàm dùng để lấy url chính của Backend, mục đích để sửa code 1 lần duy nhất
 * @returns trả về url chính của backend
 */

export function BaseURL() { 
  return "https://backend.f4koin.cyou/api/"
}

/**
 * Lấy token từ Session Storage
 * @returns Token đã bỏ đi phần 0|
 */

export function GetToken() {
  let jwt = sessionStorage.getItem('auth')
  let token;
  if (jwt !== null) {
    token = jwt.substring(2);
  }
  return token;
}

/**
 * Lấy API bằng method Get mà không sử dụng Token
 * @param {string} url Địa chỉ của API
 * @returns Một Promise của request
 */

export let GetAPINoToken = async (url) => {
  let request = await axios(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return request;
}

/**
 * Lấy API bằng method Get có sử dụng kèm với Token
 * @param {string} url Địa chỉ của API
 * @returns Một Promise của request
 */

export let GetAPIToken = async (url) => {
  let request = await axios(url, {
    headers: {
      'Authorization': `Bearer ${GetToken()}`,
      'Content-Type': 'application/json',
    },
  })
  return request;
}

/**
 * Lấy API bằng method Post có sử dụng Token, Body
 * @param {string} url Địa chỉ của API
 * @returns Một Promise của request
 */

export let PostAPIToken = async (url, body) => {
  let request = await axios(url, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${GetToken()}`,
      'Content-Type': 'application/json',
    },
    data: body
  })
  return request;
}

/**
 * Lấy API bằng method Post mà không sử dụng Token, nhưng có dùng body
 * @param {string} url Địa chỉ của API
 * @returns Một Promise của request
 */

export let PostAPINoToken = async (url, body) => {
  let request = await axios(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body
  })
  return request;
}

/**
 * Lấy API bằng method Post có sử dụng Token nhưng không sử dụng Body
 * @param {string} url Địa chỉ của API
 * @returns Một Promise của request
 */

export let PostAPINoBody = async (url) => {
  let request = await axios(url, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${GetToken()}`,
      'Content-Type': 'application/json',
    },
  })
  return request;
}