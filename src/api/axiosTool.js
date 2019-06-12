import axios from 'axios'

var axiostool = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
}) // 设置请求的基准路径

// 拦截器
axiostool.interceptors.request.use(function (config) {
  var token = localStorage.getItem('itcastpro_token')
  if (token) {
    config.headers['Authorization'] = token // 如果有token秘钥则设置到请求头上
  }
  return config // 不管设置与否，都返回一个该参数
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default axiostool
