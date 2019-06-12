import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求的时候，先检查本地是否有token值
    var token = localStorage.getItem('itcastpro_token') // 拦截器。在发送请求之前，获取一下本地是否有token
    // 如果有，则将token设置在请求头上
    if (token) {
      config.headers['Authorization'] = token
    }
    return config // 不论设置与否，都返回一个该参数
  },
  function (error) {
    // 对请求错误做些什么 将错误信息返回回去
    return Promise.reject(error)
  }
)

export const getrightdata = (type) => {
  return axios({
    type: 'get',
    url: `rights/${type}`
  })
}

export const getrolesdata = () => {
  return axios({
    type: 'get',
    url: 'roles'
  })
}

// 删除权限
export const cancelright = (roleid, rightid) => {
  return axios.delete(`roles/${roleid}/rights/${rightid}`).then((results) => {
    return results.data
  })
}

export const gettreelist = () => {
  return axios({
    type: 'get',
    url: 'rights/tree'
  })
}

// 添加角色
export const addnewpeople = (parms) => {
  return axios({
    method: 'post',
    url: 'roles',
    data: parms
  })
}

// 授权
export const authorization = (roleId, rids) => {
  return axios({
    method: 'post',
    url: `roles/${roleId}/rights`,
    data: { rids: rids }
  })
}
