/* layout */
// import Layout from './views/layout/Layout'
const Layout = resolve => require(['libs/views/layout/LayoutNew'], resolve)

/** 错误页面 */
const Error404 = resolve => require(['libs/views/error/404'], resolve)

/* custom 模板 */
const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)

const asyncRouters = [{
  path: '/',
  component: Layout,
  redirect: '/hello',
  meta: {
    title: 'proj2',
    redirect: 'hello',
    type: 'MENU'
  },
  children: [{
    path: '/hello',
    component: HelloWorld,
    meta: {
      title: 'Hello',
      type: 'MENU'
    }
  }]
}]

const basicRouters = [{
  path: '/404',
  component: Error404
}]

// export default basicRouters

module.exports = {
  basicRouters,
  asyncRouters
}
