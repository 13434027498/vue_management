import {request} from '../http'

const department = {
  findAll(){
    return request({
      url: 'department/findAll'
    })
  },

  getDepartmentList(queryMap){
    return request({
      url: 'department/findDepartmentList',
      params: queryMap
    })
  },

  getDeanList() {
    return request({
      url: 'department/findDeanList'
    })
  },

  getDepartmentEdit(id) {
    return request({
      url: `department/edit/${id}`
    })
  },

  delDepartment(id) {
    return request({
      method: 'delete',
      url: `department/delete/${id}`
    })
  },

  changeDepartment(id,changeFrom) {
    return request({
      method: 'put',
      url: `department/update/${id}`,
      data: changeFrom
    })
  },

  addDepartment(addFrom){
    return request({
      method: 'post',
      url: 'department/add',
      data: addFrom
    })
  }
}

export default department