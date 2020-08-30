import { request } from "../http"

const user = {
  login(params) {
    return request({
      method: 'post',
      url: `/user/login?username=${params.username}&password=${params.password}`
    })
  },

  getMenuList(){
    return request({
      url: 'user/findMenu'
    })
  },

  getUserInfo() {
    return request({
      url: 'user/info'
    })
  },

  getUserList(params) {
    return request({
      url: 'user/findUserList',
      params
    })
  },

  changeUserStatus(id, status) {
    return request({
      method: 'put',
      url: `user/updateStatus/${id}/${status}`
    })
  },

  addUser(user) {
    return request({
      method: 'post',
      url: 'user/add',
      data: user
    })
  },

  delUser(id) {
    return request({
      method: 'delete',
      url: `user/delete/${id}`
    })
  },

  assignRoles(id) {
    return request({
      url: `user/${id}/roles`
    })
  },

  doAssignRoles(id, value) {
    return request({
      method: 'post',
      url: `user/${id}/assignRoles`,
      data: value
    })
  }
}

export default user;