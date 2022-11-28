export function mapPathToMenu(path: string, userMenus: any) {
  if (!userMenus) return []
  for (const menu of userMenus) {
    if (menu.type == 1) {
      mapPathToMenu(path, menu.children ?? [])
    } else if (menu.type === 2 && menu.url === path) {
      return menu
    }
  }
}
