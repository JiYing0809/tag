import Cookies from 'js-cookie'
import {
  getNavBarInfo,
  getPermission
} from 'libs/api/login'
import {
  AUTH_TOKEN,
  USERNAME
} from 'libs/utils/consts'
import {
  asyncRouters
} from '@/router'
import {
  filterPermission2Route
} from 'libs/utils/route'
import {
  filterTree,
  traversalTree
} from 'libs/utils/tree'
import _ from 'lodash'
import config from 'config'

const user = {
  state: {
    token: Cookies.get(AUTH_TOKEN) === undefined ? '' : Cookies.get(AUTH_TOKEN),
    name: Cookies.get(USERNAME) === undefined ? '' : Cookies.get(USERNAME),
    avatar: '',
    permissionRoute: [] // 根据权限动态加载的 Route
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_PERMISSION (state, permissionRoute) {
      state.permissionRoute = permissionRoute
    }
  },
  actions: {
    LoginByLDAP ({
      commit,
      state
    }, userInfo) {
      const name = userInfo.name.trim()
      return new Promise((resolve, reject) => {
        loginByLDAP(name, userInfo.password).then(response => {
          const data = response.data
          Cookies.set(auth_token, data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', name)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FELogOut () {
      return new Promise(resolve => {
        // commit('SET_TOKEN', '');
        Cookies.remove(auth_token)
        resolve()
      })
    },
    LogOut () {
      sessionStorage.setItem(USERNAME, '')
      window.location.assign('/logout')
    },
    GetUserInfo ({
      commit,
      state,
      dispatch
    }) {
      return new Promise((resolve, reject) => {
        if (!config.base.needAuth) {
          commit('SET_NAME', 'test')
        }
        if (state.name && state.name.length > 0) {
          resolve()
        } else {
          getNavBarInfo().then(res => {
            // console.log(res.data)
            if (res.data.logName === 'anonymousUser') {
              reject({
                msg: '请先登录网站',
                code: 401
              })
            }
            sessionStorage.setItem(USERNAME, res.data.logName)
            dispatch('SetProfile', res.data.profile)
            commit('SET_NAME', res.data.logName)
            resolve()
          }).catch(error => {
            reject(error)
          })
        }
      })
    },
    /**
     * GetPermission 这个 action 要做的有两件事,
     * 1. 根据权限过滤路由
     * 2. 根据menuinfo 生成左边菜单. 这也有两种生成方法
     *  - 没有 menuinfo, 那么需要根据 router 生成
     *  - 有 menuinfo, 根据 menuinfo 生成
     *
     *  P.S. 这个 action 仅仅在第一次进入页面时会调用
     * @param {Object} {
     *       commit,
     *       state,
     *       getters
     *     }
     * @returns
     */
    GetPermission ({
      commit,
      state,
      getters
    }) {
      return new Promise((resolve, reject) => {
        if (!config.base.needAuth && (!state.permissionRoute || state.permissionRoute.length <= 0)) {
          const route = _.cloneDeep(asyncRouters)
          route.push({
            path: '*',
            redirect: '/404'
            // , hidden: true
          })
          commit('SET_PERMISSION', route)

          commit('UPDATE_MENU_LIST', filterTree(route, 'children', x => x.meta && x.meta.type === 'MENU'))
          // console.log(menuList)
          resolve({
            refresh: true,
            data: route
          })
        }

        if (state.permissionRoute && state.permissionRoute.length > 0) {
          resolve({
            refresh: false,
            data: state.permissionRoute
          })
        } else {
          getPermission().then(res => {
            // console.log(res.data)
            // const route = asyncRouters
            const route = filterPermission2Route(asyncRouters, res.data)
            route.push({
              path: '*',
              redirect: '/404'
              // , hidden: true
            })
            // console.log(route)
            commit('SET_PERMISSION', route)
            // console.log(route)

            const allRoute = _.cloneDeep(getters.allModuelRoute)
            const clonedThisRoute = _.cloneDeep(route)

            // 这段代码是根据路由生成菜单
            // const menuList = []
            // Object.keys(allRoute).forEach(x => {
            //   // console.log(x)
            //   if (x === config.base.name) {
            //     // 当前模块，直接拿过滤好的路由,
            //     // 然后再过滤掉不是 menu 类型的路由
            //     // console.log(filterTree(route, 'children', x => x.meta && x.meta.type === 'MENU'))
            //     menuList = menuList.concat(filterTree(route, 'children', x => x.meta && x.meta.type === 'MENU'))
            //     // console.log(menuList)
            //   } else {
            //     // 跳转其他模块
            //     allRoute[x] = filterPermission2Route(allRoute[x], res.data, '/' + x + '/#')
            //     menuList = menuList.concat(filterTree(allRoute[x], 'children', x => x.meta && x.meta.type === 'MENU'))
            //     // console.log(menuList)
            //   }
            // })

            // 下面这段是完全根据 menuinfo 生成菜单
            // 1. 先 生成所有路由的 hashmap, 方便根据 id 找到对应的路由.
            const allRouteMap = {}
            Object.keys(allRoute).forEach(x => {
              // console.log(x)
              let curRoute = []
              if (x !== config.base.name) {
                let prefix = x
                if (x.indexOf('http') >= 0) {
                  prefix = x
                } else {
                  // 以/开头是不用加/
                  prefix = (x[0] === '/' ? '' : '/') + x
                }
                // 防止最后一位出现 /
                prefix = prefix[prefix.length - 1] === '/' ? prefix.slice(0, -1) : prefix
                curRoute = filterPermission2Route(allRoute[x], res.data, prefix + '/#')
              } else {
                // 当前模块，直接拿过滤
                curRoute = clonedThisRoute
              }
              // console.log(allRoute[x])
              traversalTree(curRoute, 'children', x => {
                if (x.meta && x.meta.id) {
                  // console.log(x)
                  allRouteMap[x.meta.id] = x
                }
                return x
              })
            })
            // console.log(allRouteMap)
            // 2. 给 menuinfo增加 path,meta 属性,并把 更换为 children
            // console.log(res.data)
            const menuInfo = _.cloneDeep(res.data)
            traversalTree(menuInfo, 'menuList', x => {
              if (x.id in allRouteMap) {
                x.path = allRouteMap[x.id].path
                x.meta = _.cloneDeep(allRouteMap[x.id].meta)
                // console.log(allRouteMap[x.id])

                if (allRouteMap[x.id].redirect) {
                  x.redirect = allRouteMap[x.id].redirect
                }
              } else {
                // 即 前端路由里没有这个资源, 默认跳转到404
                x.meta = Object.assign({}, x)
                x.path = '/404'
              }
              return x
            }, x => {
              if (x.menuList) {
                x.children = x.menuList
              }
              return x
            })

            // console.log(menuInfo)
            commit('UPDATE_MENU_LIST', menuInfo)

            resolve({
              refresh: true,
              data: route
            })
          }).catch(e => [
            reject(e)
          ])
        }
      })
    }
  }
}

// generateRouteFrom

export default user
