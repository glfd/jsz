import axios from 'axios'
import qs from 'qs' // 模块
import { Message, Notice } from 'iview'
let CancelToken = axios.CancelToken
let source = CancelToken.source()

let util = {}
/*
* 请求封装
* */
const ajaxUrl = 'http://192.168.1.188:8888/alinkx/'  // url前缀
util.ajaxUrl = ajaxUrl
util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 10000,  // 超时
  responseType: 'json', // 返回数据类型
  withCredentials: true,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})
// POST传参序列化(添加请求拦截器)
util.ajax.interceptors.request.use(
  config => {
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error.data.error.message);
  }
)
util.ajax.interceptors.response.use(
  res => {
    console.log(res, 'interceptors')
    return res.data.data;
  },
  error => {
    console.log(error, 'util-response')
    Notice.error({
      title: '服务器错误',
      desc: error
    })
    return Promise.resolve(error.data.error);
  }
)
/*
*websocket
* */
// let wsUrl = 'ws://192.168.1.188:8888/springbootdemo/websocket'
util.ws = null
// socket创建连接
/*  util.ws.connect = val => {
  let url = wsUrl
  if (val !== undefined) {
    url = val
  }
  return new WebSocket(url)
}  */
// socket当前状态 0正在连接，1连接成功，2正在关闭，3连接关闭
util.readyState = ws => {
  return ws.readyState
}

/*
* 时间日期格式化
* */
let check = (str) => {
  str = str.toString()
  if (str.length < 2) {
    str = '0' + str
  }
  return str
}
util.format = (date, str) => {
  let mat = {}
  mat.M = date.getMonth() + 1 //  月份记得加1
  mat.H = date.getHours()
  mat.s = date.getSeconds()
  mat.m = date.getMinutes()
  mat.Y = date.getFullYear()
  mat.D = date.getDate()
  mat.d = date.getDay() //  星期几
  mat.d = check(mat.d)
  mat.H = check(mat.H)
  mat.M = check(mat.M)
  mat.D = check(mat.D)
  mat.s = check(mat.s)
  mat.m = check(mat.m)
  if (str.indexOf(':') > -1) {
    //  mat.Y = mat.Y.toString().substr(2, 2)
    return mat.Y + '-' + mat.M + '-' + mat.D + ' ' + mat.H + ':' + mat.m + ':' + mat.s
  }
  if (str.indexOf('/') > -1) {
    return mat.Y + '/' + mat.M + '/' + mat.D + ' ' + mat.H + '/' + mat.m + '/' + mat.s
  }
  if (str.indexOf('-') > -1) {
    return mat.Y + '-' + mat.M + '-' + mat.D + ' ' + mat.H + '-' + mat.m + '-' + mat.s
  }
}
export default util
