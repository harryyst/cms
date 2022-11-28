import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1.动态获取所有的路由对象, 放到数组中
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []

  // 1.1.读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  // 1.2.将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}
const localRoutes = loadLocalRoutes()
const routes: RouteRecordRaw[] = []
export let firstMenu: any = null

export function mapMenusToRoute(userMenus: any) {
  if (userMenus == null) return []
  for (const menu of userMenus) {
    if (menu.type === 2) {
      const route = localRoutes.find((item) => {
        return item.path === menu.url
      })
      if (route) {
        routes.push(route)
        if (!firstMenu) firstMenu = route
      }
    } else {
      mapMenusToRoute(menu.children)
    }
  }
  return routes
}

let finalMenu: any = null
export const breadcrumbs: any = ref([])
export function mapPathToMenu(
  path: string,
  userMenus: any,
  menuName: any = {}
) {
  if (!userMenus) return []
  for (const menu of userMenus) {
    if (menu.type == 1) {
      mapPathToMenu(path, menu.children ?? [], menu)
    } else if (menu.type === 2 && menu.url === path) {
      breadcrumbs.value = []
      breadcrumbs.value.push(menuName)
      breadcrumbs.value.push(menu)
      // console.log(11112222, menuName)
      finalMenu = menu
    }
  }
  return finalMenu
}
