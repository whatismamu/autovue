import axios from 'axios';
import Vue from 'vue';
import router from '../router';
import myStorage from '@/utils/myStorage';
// console.log(window.location.origin);
const instance = axios.create({
  // 詹
  baseURL: 'http://192.168.1.183:8000',
  //   debugURL: 'http://192.168.1.23:5000',
  // 黄
  // baseURL: 'http://192.168.1.49:8080',
  // 韩
  // baseURL: 'http://192.168.1.58:8080',
  // 胡
  // baseURL: 'http://192.168.1.10:8086',
  // 周
  // baseURL: 'http://192.168.1.66:8082',
  // 测试服
  // baseURL: 'https://test.uenpay.com',
  // baseURL: 'http://192.168.31.232',
  // baseURL: window.location.origin,
  // 正式服
  // baseURL: 'https://hk.uenpay.com',

  headers: {
    'Content-Type': 'application/json',
      'Authorization':'Bearer '+localStorage.getItem('token'),
  },
  data: {
    "meta":{
      "clientName": "h5",
      "clientVersion": "v1.1"
    }
  },
  timeout: 20000
});

export default {

  // baseUrl: 'http://192.168.31.232',
  baseUrl: window.location.origin,

  // imgUrl: 'http://192.168.31.232/image/',
  imgUrl: window.location.origin + '/image/',

  // 初始化表格数据
  // @params url---请求地址
  // @params self---当前实例
  initPageData(url, self) {
    const loading = Vue.prototype.$loading({
      target: document.querySelector('.baseTable')
    });
    let requestTime = new Date();
    this.post({
      url: url,
      data: self.searchForm,
      page: {
          pageNumber: self.page.curPage,
          pageSize: self.page.curPageSize
      }
    }).then(res => {
      console.log(res);
      self.page.result = res.data.result;
      self.page.totalSize = res.data.page.totalElements;
      let responseTime = new Date();
      if (((responseTime - requestTime) / 1000) < 1) {
        setTimeout(() => {
          loading.close();
        }, 500);
      } else {
        loading.close();
      }
    }).catch(error => {
      console.log(error);
      let responseTime = new Date();
      if (((responseTime - requestTime) / 1000) < 1) {
        setTimeout(() => {
          loading.close();
        }, 500);
      } else {
        loading.close();
      }
    });
  },

  post(params = { url: '', data: {}, page }, config = {}) {
    let data = Object.assign({}, params.data);
    if (params.page) {
      return instance.post(params.url, { data: data, page: params.page }, config);
    } else {
      return instance.post(params.url, { data: data }, config);
    }
  },
    get(params = { url: '', data: {}, page }, config = {}) {
    let data = Object.assign({}, params.data);
    if (params.page) {
      return instance.get(params.url, { data: data, page: params.page }, config);
    } else {
      return instance.get(params.url, { data: data }, config);
    }
    }
};

// 请求拦截器
// 1.优化请求字段，值为空的属性删除
// 2.分页请求是从0开始的
instance.interceptors.request.use(function(config) {
  for(let key in config.data.data) {
    if (config.data.data[key] === '') {
      delete config.data.data[key];  //弹窗字段为空的话，不发送到后台，可以注释就都会发了
    }
  }
  if (config.data.page) {
    config.data.page.pageNumber = config.data.page.pageNumber - 1;
  }
  const token = localStorage.getItem('token');
  if (token) {
      config.headers.Authorization = 'JWT '+token;
      // config.data.Authorization = 'Bearer '+token;
  }
  return config;
}, function(error) {
  console.error(error);
});

// 返回拦截器
instance.interceptors.response.use(function(response) {
    console.log(response);
  if (response.data.meta.statusCode === 200) {
    return response;
  }
  else if (
      response.data.message.code === 'err.401') {
    Vue.prototype.$confirm('你还没有登录, 是否去登录?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      window.location.href = window.location.origin + '/wfbs-console/login';
    }).catch(() => {
      Vue.prototype.$message({
        type: 'info',
        message: '已取消操作'
      });
    });
    return Promise.reject(response);
  } else {
      // console.log(response.data)
    Vue.prototype.$message.error(response.data.message.content);
    return Promise.reject(response);
  }
}, function(error) {
  let str = error + '';
  if (str.search('timeout') !== -1) {   // 超时error捕获
    Vue.prototype.$message.error('请求超时');
  } else {
    console.log(error.response.status);
    if ((error.response.status===401)) {
    Vue.prototype.$confirm('你还没有登录, 是否去登录?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
        localStorage.clear('token');
      window.location.href = window.location.origin + '/login';
    }).catch(() => {
      Vue.prototype.$message({
        type: 'info',
        message: '已取消操作'
      });
    });}
    else {
        Vue.prototype.$message.error('系统异常');
        // console.log(error.response);
        // Vue.prototype.$message.error(error.response.data);
    }
    // Vue.prototype.$message.error('系统异常');
  }
  return Promise.reject(error);
});
