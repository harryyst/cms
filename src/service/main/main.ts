import STRequest from '..'

export function getEntireRoles() {
  return STRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return STRequest.post({
    url: '/department/list'
  })
}

export function getEntireMenus() {
  return STRequest.post({
    url: '/menu/list'
  })
}
