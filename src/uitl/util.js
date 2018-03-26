import axios from 'axios'
import qs from 'qs' // 模块
let CancelToken = axios.CancelToken
let source = CancelToken.source()

let util = {}
/*
* 请求封装
* */
// const ajaxUrl = 'http://118.31.76.167/SZIOT/'
const ajaxUrl = 'http://192.168.1.188:8888/'
// const ajaxUrl = 'http://192.168.1.188:8888/SZIOT/'
util.ajaxUrl = ajaxUrl
util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 5000,
  headers: {'X-Requested-With': 'XMLHttpRequest'},  // `headers` 是即将被发送的自定义请求头
  transformRequest: [data => {  // `transformRequest` 允许在向服务器发送前，修改请求数据
    return qs.stringify(data)
  }]
})
util.ajax.defaults.withCredentials = true
util.get = (urlstr, data, success, error) => {
  util.ajax.get(urlstr, {
    params: data,
    cancelToken: source.token
  })
    .then(response => {
      success(response)
    })
    .catch(err => {
      error(err)
    })
}
util.post = (urlstr, data, success, error) => {
  util.ajax.post(urlstr, data)
    .then(response => {
      success(response)
    })
    .catch(err => {
      error(err)
    })
}
/*
* 并发请求
* */
util.all = (url, data, success, error) => {
  let https = []
  for (let i = 0; i < url.length; i++) {
    let urlstr = url[i]
    let http = util.ajax.post(urlstr, data[i])
    https.push(http)
  }
  util.ajax.all(https)
    .then(axios.spread(success))
    .catch((err) => {
      error(err)
    })
}
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
