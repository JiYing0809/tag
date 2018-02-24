import Cookies from 'js-cookie'
import {
  getAllRoute
} from 'api/login'
import {
  asyncRouters
} from '@/router'
const config = require('config')

const SIDEBAR_OPEN = 1
const SIDEBAR_HIDE = 0

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    // allRoute: {},
    allModuelRoute: {},
    menuList: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', SIDEBAR_OPEN)
      } else {
        Cookies.set('sidebarStatus', SIDEBAR_HIDE)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    UPDATE_SIDEBAR: (state, tobe) => {
      Cookies.set('sidebarStatus', tobe)
      state.sidebar.opened = false
    },
    UPDATE_ALL_ROUTE: (state, route) => {
      state.allModuelRoute = route
    },
    UPDATE_MENU_LIST: (state, menuList) => {
      state.menuList = menuList
    }
  },
  actions: {
    ToggleSideBar: ({
      commit
    }) => {
      commit('TOGGLE_SIDEBAR')
    },
    HideSideBar: ({
      commit
    }) => {
      commit('UPDATE_SIDEBAR', SIDEBAR_HIDE)
    },
    GetALLModuleRoute: ({
      commit,
      state
    }) => new Promise((resolve, reject) => {
      if (!config.base.needAuth) {
        commit('UPDATE_ALL_ROUTE', {
          'sdf': asyncRouters
        })
      }
      if (Object.keys(state.allModuelRoute).length > 0) {
        // console.log(state.allModuelRoute)
        resolve()
      } else {
        getAllRoute().then(res => {
          // console.log(res.data)
          // res.data = JSON.parse(res.data)
          // delete res.data[config.base.name]
          // console.log(res.data)
          commit('UPDATE_ALL_ROUTE', res.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      }
    }),
    GetMunuList: ({
      commit,
      state
    }) => new Promise((resolve, reject) => {
      if (state.menuListlength > 0) {
        // console.log(state.allModuelRoute)
        resolve()
      } else {
        getAllRoute().then(res => {
          // console.log(res.data)
          // res.data = JSON.parse(res.data)
          // delete res.data[config.base.name]
          // console.log(res.data)
          commit('UPDATE_ALL_ROUTE', res.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
}

export default app
