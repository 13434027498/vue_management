import {request} from '../http'

const menu = {
  getMenuTree() {
    return request({
      url: 'menu/tree'
    })
  }
}

export default menu