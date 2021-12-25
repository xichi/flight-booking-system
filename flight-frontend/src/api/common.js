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
export const updateUserInfo = (param = {}) => {
  return request.post({
    url: "/user/updateinfo",
    data: param,
  });
};
