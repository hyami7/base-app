import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const pathPrefix = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/base-app' : ''
/*
 * 后台基础静态路由
 */
const baseRoute = {
  path: pathPrefix + '/admin',
  name: 'admin',
  component: () => import('@/layout/AppLayout.vue'),
  children: [
    {
      path: pathPrefix + '/admin/dashboard/index',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '控制台',
      },
    },
  ],
}

/*
 * 静态路由
 */
const staticRoutes = [
  {
    path: pathPrefix + '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: pathPrefix + '/:path(.*)*',
    redirect: pathPrefix + '/admin/dashboard/index',
  },
]
staticRoutes.push(baseRoute)
export { staticRoutes, baseRoute }
