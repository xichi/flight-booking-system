import axios from "axios";
import store from "@/store";
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

const token = localStorage.getItem('token') || store.token;
const HTTP_ERROR = {
  '400': '浏览器发生错误',
  '401': '未知的用户身份',
  '403': '您没有该权限',
  '404': '无法找到文件',
  '405': '资源被禁止',
  '406': '请求的格式不可得',
  '410': '请求的资源被永久删除',
  '500': '服务器发生错误',
  '502': '网关错误',
  '503': '服务不可用，服务器暂时过载或维护',
  '504': '网关超时',
}

function checkHttpStatus(res, resolve, reject) {
  const { status, data } = res;
  const message = HTTP_ERROR[status] || `ERROR CODE: ${status}`
  if (status >= 200 && status < 300) {
    if (data.hasOwnProperty('success') && data.success === false) {
      ElMessage({
        message: `糟糕！遇到错误：${data.message || message}`,
        type: 'error',
      })
      reject(`ERROR ${status}: ${data.message || message}`)
    } else {
      resolve(res.data)
    }
  } else if (status == 401) {
    ElMessage({
      message: "请先登录再查看哦！",
      type: 'error',
    })
    this.$router('/login');
    reject('ERROR 401');
  } else {
    ElMessage({
      message: `糟糕！遇到错误：${data.message || message}`,
      type: 'error',
    })
    reject(`ERROR ${status}: ${data.errorMsg || message}`)
  }
}

export default {
  request(options, method) {
    const url = options.url || '';
    return new Promise((resolve, reject) => {
      axios({
        ...options,
        url: `${import.meta.env.VITE_APP_SRC}/api${url}`,
        method: method || 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          ...options.header
        }
      }).then(res => {
        checkHttpStatus(res, resolve, reject)
      })
    })
  },
  get(options) {
    return this.request({
      ...options
    })
  },
  post(options) {
    return this.request({
      ...options,
      data: options.data
    }, 'POST')
  },
  put(options) {
    return this.request({
      ...options,
      data: options.data
    }, 'PUT')
  },
  delete(options) {
    return this.request({
      ...options,
      data: options.data
    }, 'DELETE')
  }
}