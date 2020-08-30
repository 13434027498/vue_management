import { request } from '../http'

const role = {
  getRoleData(queryMap) {
    return request({
      url: 'role/findRoleList',
      params: queryMap
    })
  },

  authority(id,value) {
    return request({
      method: 'post',
      url: `role/authority/${id}`,
      data: value
    })
  },

  getGrantRole(id){
    return request({
      url: `role/findRoleMenu/${id}`
    })
  }
}

export default role