import axios from "axios";

export function GetToken() {
  let jwt = localStorage.getItem('auth')
  let token;
  if (jwt !== null) {
    token = jwt.substring(2);
  }
  return token;
}

export let GetAPINoToken = async (url) => {
  let request = await axios(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return request;
}

export let GetAPIToken = async (url) => {
  let request = await axios(url, {
    headers: {
      'Authorization': `Bearer ${GetToken()}`,
      'Content-Type': 'application/json',
    },
  })
  return request;
}

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