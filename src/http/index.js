import axios from 'axios';
import { notifyError } from './notify';
import store from '@/store';
// import router from '@/router';

// let promiseArr = {};

// 请求拦截器
axios.interceptors.request.use(config => {
  let token = store.state.login.token;
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
});
let token = store.state.login.token || sessionStorage.getItem('token');
// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        // error.message = '用户名或密码不正确';
        break;
      case 401:
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = '请求错误,未找到该资源';
        break;
      case 408:
        error.message = '请求方法未允许';
        break;
      case 422:
        error.message = '表单输入错误';
        break;
      case 500:
        error.message = '服务器端出错';
        break;
      case 501:
        error.message = '网络未实现';
        break;
      case 502:
        error.message = '网络错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网络超时';
        break;
      default:
        error.message = `连接错误${error.response.status}`;
    }
  } else {
    error.message = '连接服务器失败';
  }
  notifyError(error.message);
  return Promise.resolve(error.response);
});

// 设置默认参数
axios.defaults.baseURL = '/api';
axios.defaults.headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

axios.defaults.timeout = 100000;

export default {
  // get请求
  get (url, param) {
    return axios({
      method: 'get',
      url,
      params: param
    });
  },
  // post请求
  post (url, param) {
    return axios({
      method: 'post',
      url,
      data: param
    });
  },
  // put请求
  put (url, param) {
    return axios({
      method: 'put',
      url,
      data: param
    });
  },
  // delete请求
  delete (url, param) {
    return axios({
      method: 'delete',
      url,
      params: param
    });
  }
};
