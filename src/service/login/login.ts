import type { IAccount } from '@/types'
import STRequest from '..'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

export function accountLoginRequest(account: IAccount) {
  return STRequest.post({
    url: '/Login',
    data: {
      TransCode: 'LOG001',
      AccountNo: account.name,
      AccountPwd: account.password
    }
  })
}

export function getUserInfoById(id: number) {
  return STRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenusByRoleId(id: number) {
  return STRequest.get({
    url: `/role/${id}/menu`
  })
}
