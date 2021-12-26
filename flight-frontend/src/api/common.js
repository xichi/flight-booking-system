import request from "./index";
// ADMIN API
export const adminLogin = (username, passwd) => {
  return request.post({
    url: "/admin/login",
    data: {
      username,
      passwd,
    },
  });
};

export const userLogin = (username, passwd) => {
  return request.post({
    url: "/user/login",
    data: {
      username,
      passwd,
    },
  });
};

export const getAllAdmin = (username, passwd) => {
  return request.get({
    url: "/admin/getAllAdmin",
  });
};

// 管理员和用户都用这个接口退出登录
export const signout = (username, passwd) => {
  return request.post({
    url: "/user/signout",
  });
};

// 获取用户权限，请问你是管理员吗？
export const checkAuth = () => {
  return request.get({
    url: "/user/checkAuth",
  });
};

// 用户注册
export const register = (username, email, passwd, repeatedPasswd) => {
  return request.post({
    url: "/user/register",
    data: {
      username,
      email,
      passwd,
      repeatedPasswd,
    },
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request.get({
    url: "/user/getUserInfo",
  });
};

// 修改用户信息
export const updateUserInfo = (params = {}) => {
  return request.post({
    url: "/user/updateinfo",
    data: params,
  });
};

// 查询航班
export const queryFlight = (from_city, to_city, departure_date) => {
  return request.get({
    url: `/flight/getOnes?from_city=${from_city}&to_city=${to_city}&departure_date=${departure_date}`,
  });
};

export const getAllFlight = () => {
  return request.get({
    url: "/flight/getAll",
  });
};

export const addFlight = (params = {}) => {
  return request.post({
    url: "/flight/addOne",
    data: params,
  });
};

export const updateFlight = (params = {}) => {
  return request.post({
    url: "/flight/updateOne",
    data: params,
  });
};

export const buyTicket = (flight_id, order_price) => {
  return request.post({
    url: "/flight/buyTicket",
    data: {
      flight_id,
      order_price,
    },
  });
};

export const getAllOrder = () => {
  return request.get({
    url: "/order/getAll",
  });
};

export const getMyOrder = () => {
  return request.get({
    url: "/order/getMine",
  });
};