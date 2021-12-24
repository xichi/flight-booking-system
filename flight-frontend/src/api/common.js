import request from './index';
// ADMIN API
export const adminLogin = (username, passwd) => {
  return request.post({
    url: "/admin/login",
    data: {
      username,
      passwd
    }
  })
}

export const getAllAdmin = (username, passwd) => {
  return request.post({
    url: "/admin/login",
    data: {
      username,
      passwd
    }
  })
}