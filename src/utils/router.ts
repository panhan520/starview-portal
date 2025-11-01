import { router } from '~/routers'

/** 检查路由 */
let routes = []
export const checkRoute = (field: 'name' | 'path', target: string) => {
  if (!routes.length) {
    routes = router.getRoutes()
  }
  return routes.find(v => v[field] === target)
}
