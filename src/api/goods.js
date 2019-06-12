import axiostool from '@/api/axiosTool.js'

export const getgoodlist = (type) => {
  return axiostool({
    url: 'categories',
    params: {
      type
    }
  })
}

export const getAllgoods = (obj) => {
  return axiostool.get('goods', { params: obj })
    .then((result) => {
      return result
    })
}

export const addonegood = (data) => {
  return axiostool({
    method: 'post',
    url: 'goods',
    data
  })
}
