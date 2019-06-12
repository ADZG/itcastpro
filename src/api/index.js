import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求的时候，先检查本地是否有token值
  var token = localStorage.getItem('itcastpro_token') // 拦截器。在发送请求之前，获取一下本地是否有token
  // 如果有，则将token设置在请求头上
  if (token) {
    config.headers['Authorization'] = token
  }
  return config // 不论设置与否，都返回一个该参数
}, function (error) {
  // 对请求错误做些什么 将错误信息返回回去
  return Promise.reject(error)
})
// 登录验证
export const login = (obj) => {
  // axios.post是一个promise对象
  // .then返回的的还是一个promise对象
  return axios.post('login', obj)
    .then(function (response) {
      // then的回调函数中的返回值，最终会返回到这个对象的then的方法中
      return response.data
      // 最终这个数据，会返回到axios.post promise对象的 .then方法里面的函数的参数
      // 也就是目前看到的response
    })
  // return axios({
  //   type: 'post',
  //   url: 'login',
  //   data: obj
  // })
}

// 获取用户数据
export const getlist = (obj) => {
  // 返回的axios.get是一个promis对象
  return axios.get('users',
    { params: obj }
  )
  // .then返回的还是一个promise对象
    .then(function (response) {
      // 返回的这个数据，getlist这个promise对象的.then方法里面的回调函数的参数，就是数据了
      return response.data
    })
}

export const getuserdata = (id) => {
  // 此时会返回一个promise对象，
  return axios.get(`users/${id}`)
    .then((res) => {
      // 此时返回的数据，就是引用时.then里面的数据
      return res.data
    })
}

// 根据id上传编辑的数据
export const edituser = (obj) => {
  return axios.put(`users/${obj.id}`, obj)
    .then((result) => {
      return result.data
    })
}

// 删除单个用户
export const deluser = (id) => {
  return axios.delete(`users/${id}`)
    .then((result) => {
      return result.data
    })
}

// 设置开关的状态
export const switchuser = (id, type) => {
  return axios.put(`users/${id}/state/${type}`)
    .then((resu1t) => {
      return resu1t.data
    })
}

// 获取所有的角色列表
export const allroles = () => {
  return axios.get('roles')
    .then((result) => {
      return result.data
    })
}

// 改变分配角色位置 Api有问题没有用
export const apportion = (id, rid) => {
  return axios.put(`users/${id}/role`, { rid })
    .then((result) => {
      return result.data
    })
}

// 添加用户
export const addstaff = (obj) => {
  return axios.post('users', obj)
  // 这里是promise对象。返回回去，下面是该对象成功后的回调函数，并且返回已经不再是一个promise对象了，而是另外一种数据
  // 所以将该数据，作为下一个.then的参数了
    .then((result) => {
      return result.data
    })
}

export const menubar = () => {
  return axios({
    url: 'menus' // 默认为get方式
  })
}
