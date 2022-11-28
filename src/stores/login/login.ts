import { USER_INFO, USER_MENUS } from './../../global/constants'
import type { IAccount } from '@/types'
import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { mapMenusToRoute } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      const res = await accountLoginRequest(account)
      console.log(res)
      const id = res.data.id
      this.token = res.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      const res1 = await getUserInfoById(id)
      const res2 = await getUserMenusByRoleId(res1.data.role.id)
      this.userInfo = res1.data
      this.userMenus = res2.data

      const routes = mapMenusToRoute(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      localCache.setCache(USER_INFO, this.userInfo)
      localCache.setCache(USER_MENUS, this.userMenus)

      router.push('/main')
    },
    getlocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENUS)
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
      }
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      const routes = mapMenusToRoute(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      console.log(routes)
    }
  }
})

export default useLoginStore
